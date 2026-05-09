// groups.ts

export interface SportInfo {
  name: string;
}

export interface ProfileInfo {
  username: string;
  full_name: string;
}

export interface GroupMemberDetail {
  is_captain: boolean;
  status: 'Joined' | 'Confirmed' | 'Declined';
  profiles: ProfileInfo; // Datele venite din join-ul profiles(...)
}

export interface MatchGroupModel {
  id: string;
  match_date: string;
  status: string;
  sports: SportInfo;
  group_members?: GroupMemberDetail[]; // ACEASTA ERA PROPRIETATEA LIPSĂ!
}

export interface GroupMemberModel {
  id: string;
  is_captain: boolean;
  status: 'Joined' | 'Confirmed' | 'Declined';
  match_groups: MatchGroupModel;
}