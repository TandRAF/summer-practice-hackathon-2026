import { useState, useEffect, useCallback } from 'react';
import type { GroupMemberModel } from '../types/groups';
import { groupsService } from '../services/groupsService';

export const useGroups = () => {
  const [myGroups, setMyGroups] = useState<GroupMemberModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadGroups = useCallback(async () => {
    setLoading(true);
    try {
      const data = await groupsService.getMyGroups();
      setMyGroups(data);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to fetch groups');
    } finally {
      setLoading(false);
    }
  }, []);

  const respondToMatch = async (memberId: string, status: 'Confirmed' | 'Declined') => {
    try {
      await groupsService.updateStatus(memberId, status);
      await loadGroups(); // Refresh rapid pentru a actualiza UI-ul
      return true;
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to update status');
      return false;
    }
  };

  useEffect(() => {
    loadGroups();
  }, [loadGroups]);

  return { myGroups, loading, error, respondToMatch, refreshGroups: loadGroups };
};