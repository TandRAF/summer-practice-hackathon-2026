import { supabase } from '../../shared/supabase.js';

export const getVenuesHandler = async () => {
  const { data, error } = await supabase.from('venues').select('*');
  if (error) throw new Error(error.message);
  return data;
};

export const createEventHandler = async (userId: string, eventData: any) => {
  // 1. Check if user is the captain of this group
  const { data: member, error: memberErr } = await supabase
    .from('group_members')
    .select('is_captain')
    .eq('group_id', eventData.group_id)
    .eq('user_id', userId)
    .single();

  if (memberErr || !member?.is_captain) {
    throw new Error("Only the group captain can create the event!");
  }

  // 2. Create the event inside a transaction-like flow
  const { data: event, error: eventErr } = await supabase
    .from('events')
    .insert({ ...eventData, is_manual_creation: false, status: 'Confirmed' })
    .select()
    .single();

  if (eventErr) throw new Error(eventErr.message);

  // 3. Mark the group as completed/scheduled
  await supabase.from('match_groups').update({ status: 'Completed' }).eq('id', eventData.group_id);

  return event;
};