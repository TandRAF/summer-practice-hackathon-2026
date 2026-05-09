import { useState, useEffect } from 'react';
import type { VenueModel, CreateEventDTO } from '../types/events';
import { eventsService } from '../services/eventsService';

export const useEvents = () => {
  const [venues, setVenues] = useState<VenueModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadVenues = async () => {
    setLoading(true);
    try {
      const data = await eventsService.getVenues();
      setVenues(data);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to load venues');
    } finally {
      setLoading(false);
    }
  };

  const createNewEvent = async (eventData: CreateEventDTO) => {
    setLoading(true);
    try {
      const result = await eventsService.createEvent(eventData);
      return result.event; // Returnează evenimentul creat
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to create event');
      return null;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVenues();
  }, []);

  return { venues, loading, error, createNewEvent, refreshVenues: loadVenues };
};