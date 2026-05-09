// src/services/profileService.ts
import { api } from './api';
import { type ProfileModel, type UpdateProfileDTO } from '../types/profile';

const ENDPOINT = '/profile';

export const profileService = {
  getProfile: async (): Promise<ProfileModel> => {
    const response = await api.get<ProfileModel>(ENDPOINT);
    return response.data;
  },

  // NEW: Update standard profile fields
  updateProfile: async (data: UpdateProfileDTO): Promise<{ message: string; profile: ProfileModel }> => {
    const response = await api.patch<{ message: string; profile: ProfileModel }>(ENDPOINT, data);
    return response.data;
  },

  updateAvatar: async (avatar_url: string): Promise<{ message: string; profile: ProfileModel }> => {
    const response = await api.patch<{ message: string; profile: ProfileModel }>(`${ENDPOINT}/avatar`, {
      avatar_url,
    });
    return response.data;
  }
};