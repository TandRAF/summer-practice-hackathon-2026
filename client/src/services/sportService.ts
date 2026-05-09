import {api} from './api';
import type { SportModel, UserSportPreferenceModel, SetPreferenceDTO } from '../types/sports';

export const sportsService = {
  getAllSports: async (): Promise<SportModel[]> => {
    const response = await api.get('/sports');
    return response.data;
  },

  getMyPreferences: async (): Promise<UserSportPreferenceModel[]> => {
    const response = await api.get('/sports/preferences');
    return response.data;
  },

  setPreference: async (data: SetPreferenceDTO): Promise<{ message: string, preference: UserSportPreferenceModel }> => {
    const response = await api.post('/sports/preferences', data);
    return response.data;
  }
};