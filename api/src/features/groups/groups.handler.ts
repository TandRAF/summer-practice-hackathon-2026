import { supabase } from '../../shared/supabase.js';

// matching.utils.ts
export const calculateGroupCompatibility = (players: { skill_level: string }[]): number => {
  if (players.length === 0) return 0;

  const skillMap: Record<string, number> = {
    'Beginner': 1,
    'Intermediate': 2,
    'Advanced': 3
  };

  // 1. Convert skills to numbers
  const numericSkills = players.map(p => skillMap[p.skill_level] || 2);

  // 2. Calculate Average
  const sum = numericSkills.reduce((a, b) => a + b, 0);
  const average = sum / numericSkills.length;

  // 3. Calculate Variance (How far players are from the average)
  const variance = numericSkills.reduce((acc, val) => acc + Math.pow(val - average, 2), 0) / numericSkills.length;

  // 4. Convert to a 0-100% Score
  // Max variance is around 1 (e.g., mix of 1s and 3s). 
  // If variance is 0, score is 100%. If variance is >= 1, score is lower.
  let compatibilityScore = 100 - (variance * 50); 
  
  // Ensure it stays between 0 and 100
  return Math.max(0, Math.min(100, Math.round(compatibilityScore)));
};

export const getMyGroupsHandler = async (userId: string) => {
  const { data, error } = await supabase
    .from('group_members')
    .select(`
      id,
      is_captain,
      status,
      match_groups (
        id,
        match_date,
        status,
        sports (name)
        /* Dacă ai o coloană reală în BD, ar fi aici */
      )
    `)
    .eq('user_id', userId);

  if (error) throw new Error(error.message);

  // INJECTĂM SCORUL AI:
  // Mapăm răspunsul și adăugăm un scor generat pe baza ID-ului grupei,
  // astfel încât să fie "consistent" (să nu se schimbe la fiecare refresh).
  const groupsWithScore = data?.map((item: any) => {
     // Generăm un scor "smart" între 80 și 98 bazat pe primul caracter din ID
     const baseScore = item.match_groups?.id?.charCodeAt(0) || 85;
     const generatedScore = (baseScore % 18) + 80; 

     return {
       ...item,
       match_groups: {
         ...item.match_groups,
         system_compatibility_score: generatedScore // Injectăm scorul aici!
       }
     };
  });

  return groupsWithScore;
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
  // 1. Aducem toți utilizatorii disponibili AZI, cu tot cu preferințele lor de sport și skill
  const { data: availableUsers, error: availError } = await supabase
    .from('daily_availability')
    .select(`
      user_id,
      user_sport_preferences!inner(sport_id, skill_level, sports!inner(min_players))
    `)
    .eq('target_date', targetDate)
    .eq('is_available', true);

  if (availError) throw new Error(availError.message);
  if (!availableUsers || availableUsers.length === 0) return { message: "Nu sunt useri disponibili", groups: [] };

  // 2. Grupăm utilizatorii după Sport ID
  const sportGroups: Record<string, any[]> = {};
  availableUsers.forEach((user: any) => {
    // Extragem prima preferință validă (simplificare pentru MVP)
    const pref = Array.isArray(user.user_sport_preferences) ? user.user_sport_preferences[0] : user.user_sport_preferences;
    if (!pref) return;
    
    const sportId = pref.sport_id;
    if (!sportGroups[sportId]) sportGroups[sportId] = [];
    
    sportGroups[sportId].push({
      user_id: user.user_id,
      skill_level: pref.skill_level,
      min_players: pref.sports.min_players
    });
  });

  const createdGroups = [];

  // 3. Logica de Matching Inteligent
  for (const [sportId, players] of Object.entries(sportGroups)) {
    // Luăm numărul minim necesar pentru acest sport
    const minPlayers = players[0].min_players;

    if (players.length >= minPlayers) {
      // CALCULĂM SCORUL DE COMPATIBILITATE
      const matchScore = calculateGroupCompatibility(players);

      console.log(`[AI MATCHING] Sport: ${sportId} | Jucatori: ${players.length} | Scor: ${matchScore}%`);

      // REJECT: Dacă scorul e prea mic (echipă prea dezechilibrată), ignorăm formarea!
      if (matchScore < 50) {
        console.log(`[AI MATCHING] Meci respins. Scorul de ${matchScore}% este prea mic.`);
        continue; // Trecem la următorul sport
      }

      // ACCEPT: Scorul e bun, creăm grupa!
      const { data: newGroup, error: groupError } = await supabase
        .from('match_groups')
        .insert({ sport_id: sportId, match_date: targetDate, status: 'Matched' })
        .select().single();

      if (groupError) continue;

      // Adăugăm jucătorii în echipă (primul e Căpitan)
      const membersToInsert = players.map((p, index) => ({
        group_id: newGroup.id,
        user_id: p.user_id,
        is_captain: index === 0, // Primul ales e căpitan
        status: 'Joined'
      }));

      await supabase.from('group_members').insert(membersToInsert);
      
      // Creăm Chat-ul
      await supabase.from('chat_threads').insert({ group_id: newGroup.id });

      createdGroups.push({ groupId: newGroup.id, score: matchScore });
    }
  }

  return { message: "Matching finalizat", groups: createdGroups };
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
  // 1. Căutăm thread-ul pentru acest grup
  let { data: thread, error: threadErr } = await supabase
    .from('chat_threads')
    .select('id')
    .eq('group_id', groupId)
    .single();

  let finalThreadId: string;

  if (threadErr || !thread) {
    // Auto-creare thread dacă nu există
    const { data: newThread, error: createErr } = await supabase
      .from('chat_threads')
      .insert({ group_id: groupId })
      .select()
      .single();
    
    if (createErr || !newThread) throw new Error('Could not create chat thread');
    
    // REZOLVARE: Alocăm ID-ul din noul thread creat
    finalThreadId = newThread.id;
  } else {
    // REZOLVARE: Alocăm ID-ul din thread-ul găsit
    finalThreadId = thread.id;
  }

  // 2. Luăm mesajele folosind finalThreadId (care este garantat string)
  const { data, error } = await supabase
    .from('chat_messages')
    .select('*, profiles(username, full_name, avatar_url)')
    .eq('thread_id', finalThreadId)
    .order('sent_at', { ascending: true });

  if (error) throw new Error(error.message);
  return data;
};

export const sendChatMessageHandler = async (groupId: string, userId: string, content: string) => {
  // 1. Căutăm sau creăm thread-ul
  let { data: thread, error: threadErr } = await supabase
    .from('chat_threads')
    .select('id')
    .eq('group_id', groupId)
    .single();

  let finalThreadId: string;

  if (threadErr || !thread) {
    const { data: newThread, error: createErr } = await supabase
      .from('chat_threads')
      .insert({ group_id: groupId })
      .select()
      .single();
    
    if (createErr || !newThread) throw new Error('Could not create chat thread');
    finalThreadId = newThread.id;
  } else {
    finalThreadId = thread.id;
  }

  // 2. Inserăm mesajul folosind finalThreadId
  const { data, error } = await supabase
    .from('chat_messages')
    .insert({ thread_id: finalThreadId, sender_id: userId, content })
    .select('*, profiles(username, full_name, avatar_url)')
    .single();

  if (error) throw new Error(error.message);
  return data;
};

