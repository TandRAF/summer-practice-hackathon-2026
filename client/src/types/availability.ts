export interface DailyAvailabilityModel {
  id: string;
  user_id: string;
  target_date: string;
  is_available: boolean;
  responded_at: string;
}

export interface SetAvailabilityDTO {
  target_date: string;
  is_available: boolean;
}