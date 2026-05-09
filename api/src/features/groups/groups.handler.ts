import { supabase } from '../../shared/supabase.js';

export const getMyGroupsHandler = async (userId: string) => {
  const { data, error } = await supabase
    .from('group_members')
    .select(`
      id, is_captain, status,
      match_groups ( id, match_date, status, sports ( name ) )
    `)
    .eq('user_id', userId);

  if (error) throw new Error(error.message);
  return data;
};

export const updateMemberStatusHandler = async (memberId: string, userId: string, status: string) => {
  const { data, error } = await supabase
    .from('group_members')
    .update({ status })
    .eq('id', memberId)
    .eq('user_id', userId) // Security check: only update own status
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
};

export const generateMatchesHandler = async (targetDate: string) => {
  // 1. Get everyone available today
  const { data: availableUsers, error: availErr } = await supabase
    .from('daily_availability')
    .select('user_id')
    .eq('target_date', targetDate)
    .eq('is_available', true);
  
  if (availErr || !availableUsers) throw new Error("Could not fetch available users");

  const userIds = availableUsers.map(u => u.user_id);
  if (userIds.length === 0) return { message: "No users available today" };

  // 2. Get their sport preferences
  const { data: prefs, error: prefErr } = await supabase
    .from('user_sport_preferences')
    .select('user_id, sport_id')
    .in('user_id', userIds);

  if (prefErr || !prefs) throw new Error("Could not fetch preferences");

  // 3. Group users by sport
  const sportGroups: Record<string, string[]> = {};
    prefs.forEach(p => {
    // Ne asigurăm că p.sport_id și p.user_id există efectiv (măsură de siguranță Supabase)
    if (!p.sport_id || !p.user_id) return; 

    if (!sportGroups[p.sport_id]) sportGroups[p.sport_id] = [];
    
    // Am adăugat '!' înainte de .push()
    sportGroups[p.sport_id]!.push(p.user_id); 
  });

  const createdGroups = [];

  // 4. Create MatchGroups and Members
  for (const [sportId, users] of Object.entries(sportGroups)) {
    if (users.length < 2) continue; // Skip if not enough people (can be tweaked based on sport limits)

    // Create the MatchGroup
    const { data: group, error: groupErr } = await supabase
      .from('match_groups')
      .insert({ sport_id: sportId, match_date: targetDate, status: 'Matched' })
      .select().single();

    if (groupErr || !group) continue;

    // Pick a random captain
    const captainIndex = Math.floor(Math.random() * users.length);

    // Create GroupMembers
    const membersToInsert = users.map((uid, index) => ({
      group_id: group.id,
      user_id: uid,
      is_captain: index === captainIndex,
      status: 'Joined'
    }));

    await supabase.from('group_members').insert(membersToInsert);
    createdGroups.push(group.id);
  }

  return { message: `Generated ${createdGroups.length} groups!`, groups: createdGroups };
};
export const getGroupWithMembersHandler = async (groupId: string) => {
  const { data, error } = await supabase
    .from('match_groups')
    .select(`
      *,
      sports(name),
      group_members(
        is_captain,
        status,
        profiles(username, full_name)
      )
    `)
    .eq('id', groupId)
    .single();

  if (error) {
    throw new Error(`Failed to fetch group details: ${error.message}`);
  }

  return data;
};
export const getChatMessagesHandler = async (groupId: string) => {
  // 1. Find or create the thread for this group
  let { data: thread, error: threadErr } = await supabase
    .from('chat_threads')
    .select('id')
    .eq('group_id', groupId)
    .single();

  if (threadErr || !thread) {
    // Auto-create thread if it doesn't exist
    const { data: newThread, error: createErr } = await supabase
      .from('chat_threads')
      .insert({ group_id: groupId })
      .select()
      .single();
    if (createErr || !newThread) throw new Error('Could not create chat thread');
    thread = newThread;
  }

  // 2. Get messages for that thread
  const { data, error } = await supabase
    .from('chat_messages')
    .select('*, profiles(username, full_name, avatar_url)')
    .eq('thread_id', thread.id)
    .order('sent_at', { ascending: true });

  if (error) throw new Error(error.message);
  return data;
};

export const sendChatMessageHandler = async (groupId: string, userId: string, content: string) => {
  // 1. Find or create thread
  let { data: thread, error: threadErr } = await supabase
    .from('chat_threads')
    .select('id')
    .eq('group_id', groupId)
    .single();

  if (threadErr || !thread) {
    const { data: newThread, error: createErr } = await supabase
      .from('chat_threads')
      .insert({ group_id: groupId })
      .select()
      .single();
    if (createErr || !newThread) throw new Error('Could not create chat thread');
    thread = newThread;
  }

  // 2. Insert message
  const { data, error } = await supabase
    .from('chat_messages')
    .insert({ thread_id: thread.id, sender_id: userId, content })
    .select('*, profiles(username, full_name, avatar_url)')
    .single();

  if (error) throw new Error(error.message);
  return data;
};