import { useState, useEffect } from 'react';
import type { MatchGroupModel } from '../types/groups';
import { groupsService } from '../services/groupsService';

export const useGroupDetails = (groupId: string | undefined) => {
  const [group, setGroup] = useState<MatchGroupModel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!groupId) return;
    setLoading(true);
    groupsService.getGroupDetails(groupId)
      .then(data => { setGroup(data); setError(null); })
      .catch(err => setError(err.response?.data?.error || 'Failed to fetch group'))
      .finally(() => setLoading(false));
  }, [groupId]);

  return { group, loading, error };
};