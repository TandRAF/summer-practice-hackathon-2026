import { useState, useEffect, useCallback } from 'react';
import type { SportModel, UserSportPreferenceModel, SetPreferenceDTO } from '../types/sports';
import { sportsService } from '../services/sportService';

export const useSports = () => {
  const [sportsList, setSportsList] = useState<SportModel[]>([]);
  const [preferences, setPreferences] = useState<UserSportPreferenceModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Încărcăm în paralel pentru viteză maximă
      const [sportsData, prefsData] = await Promise.all([
        sportsService.getAllSports(),
        sportsService.getMyPreferences()
      ]);
      
      setSportsList(sportsData);
      setPreferences(prefsData);
    } catch (err: any) {
      setError(err.response?.data?.error || err.message || 'Failed to load sports data');
    } finally {
      setLoading(false);
    }
  }, []);

  const savePreference = async (sportId: string, skillLevel: SetPreferenceDTO['skill_level']) => {
    try {
      await sportsService.setPreference({ sport_id: sportId, skill_level: skillLevel });
      await loadData(); // Reîncărcăm datele pentru a obține obiectul complet (cu numele sportului prin join)
      return true;
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to save sport preference');
      return false;
    }
  };

  useEffect(() => {
    loadData();
  }, [loadData]);

  return { 
    sportsList, 
    preferences, 
    loading, 
    error, 
    savePreference, 
    refresh: loadData 
  };
};