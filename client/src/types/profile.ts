// src/types/profile.ts

export interface ProfileModel {
  id: string;
  username: string;
  full_name?: string;
  location?: string;
  timezone?: string;
  biography?: string;
  avatar_url?: string;
  updated_at: string;
}

export interface UpdateProfileDTO {
  full_name?: string;
  location?: string;
  timezone?: string;
  biography?: string;
}

export interface UpdateAvatarDTO {
  avatar_url: string;
}