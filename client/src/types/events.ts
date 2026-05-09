export interface VenueModel {
  id: string;
  name: string;
  address: string;
  coordinates: string;
  price_estimate: number;
}

export interface CreateEventDTO {
  group_id: string;
  venue_id: string;
  title: string;
  event_time: string;
}