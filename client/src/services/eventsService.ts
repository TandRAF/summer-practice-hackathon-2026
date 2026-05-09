import {api} from './api'; 
import type { VenueModel, CreateEventDTO } from '../types/events';

export const eventsService = {
  getVenues: async (): Promise<VenueModel[]> => {
    const response = await api.get('/events/venues');
    return response.data;
  },

  createEvent: async (data: CreateEventDTO) => {
    const response = await api.post('/events', data);
    return response.data;
  }
};