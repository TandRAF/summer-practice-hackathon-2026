import { useState, useEffect } from 'react';
import type { DailyAvailabilityModel } from '../types/availability';
import { availabilityService } from '../services/availabilityService';

export const useAvailability = () => {
  const [availability, setAvailability] = useState<DailyAvailabilityModel | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadAvailability = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await availabilityService.getToday();
      setAvailability(data.is_available !== undefined ? data : null);
    } catch (err: any) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  const submitAvailability = async (isAvailable: boolean) => {
    setLoading(true);
    try {
      // Generăm data de azi în format YYYY-MM-DD local
      const targetDate = new Date().toISOString().split('T')[0];
      
      const data = await availabilityService.setAvailability({
        target_date: targetDate,
        is_available: isAvailable
      });
      
      setAvailability(data.availability);
      return true;
    } catch (err: any) {
      setError(err.response?.data?.error || 'Error setting availability');
      return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAvailability();
  }, []);

  return { 
    availability, 
    loading, 
    error, 
    submitAvailability, 
    refresh: loadAvailability 
  };
};