export interface SportModel {
  id: string;
  name: string;
  min_players: number;
  max_players: number;
}

export interface UserSportPreferenceModel {
  id: string;
  user_id: string;
  sport_id: string;
  skill_level: string;
  sports?: { name: string }; // Numele sportului vine din join-ul făcut pe backend
}

export interface SetPreferenceDTO {
  sport_id: string;
  skill_level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Pro';
}