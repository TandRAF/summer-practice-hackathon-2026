// src/hooks/useProfile.ts
import { useState, useEffect } from 'react';
import { type ProfileModel, type UpdateProfileDTO } from '../types/profile';
import { profileService } from '../services/profileService';

export const useProfile = () => {
  const [profile, setProfile] = useState<ProfileModel | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadProfile = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await profileService.getProfile();
      setProfile(data);
    } catch (err: any) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  const changeAvatar = async (newUrl: string) => {
    try {
      const data = await profileService.updateAvatar(newUrl);
      setProfile(data.profile);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Error updating avatar');
    }
  };

  // NEW: Function to save the rest of the profile data
  const saveProfile = async (updates: UpdateProfileDTO) => {
    try {
      const data = await profileService.updateProfile(updates);
      setProfile(data.profile); // Optimistically update local state
      return true; // Return success status for UI feedback
    } catch (err: any) {
      setError(err.response?.data?.error || 'Error updating profile');
      return false;
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  return { 
    profile, 
    loading, 
    error, 
    changeAvatar, 
    saveProfile, // Exported to component
    refresh: loadProfile 
  };
};