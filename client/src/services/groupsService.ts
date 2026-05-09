import {api} from './api';
import type { GroupMemberModel, MatchGroupModel } from '../types/groups';

export const groupsService = {
  getMyGroups: async (): Promise<GroupMemberModel[]> => {
    const response = await api.get('/groups/my');
    return response.data;
  },

  updateStatus: async (memberId: string, status: 'Confirmed' | 'Declined') => {
    const response = await api.patch(`/groups/members/${memberId}/status`, { status });
    return response.data;
  },
  getGroupDetails: async (groupId: string): Promise<MatchGroupModel> => {
  const res = await api.get(`/groups/${groupId}`);
  return res.data;
},
};
