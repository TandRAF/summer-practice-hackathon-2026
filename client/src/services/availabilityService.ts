import {api} from './api'; // Adaptează calea către instanța ta de axios
import type { DailyAvailabilityModel, SetAvailabilityDTO } from '../types/availability';

export const availabilityService = {
  getToday: async (): Promise<DailyAvailabilityModel> => {
    const response = await api.get('/availability/today');
    return response.data;
  },

  setAvailability: async (data: SetAvailabilityDTO): Promise<{ message: string, availability: DailyAvailabilityModel }> => {
    const response = await api.post('/availability', data);
    return response.data;
  }
};