export interface TimelineItemProps {
  _id: string;
  eventId: string;
  date: string;
  title: string;
  subtitle?: string;
  status?: string;
  location?: string;
  countryName?: string;
  countryCode?: string;
  imageUrl?: string;
  imageCaption?: string;
  imageType?: string;
  imageSource?: string;
  events: string[];
  dateCreated: string;
  dateUpdated: string;
}
export interface Event {
  _id: string;
  title: string;
  slug: string;
  description: string;
  coverImage: string;
  tags: string[];
  dateCreated: string;
  dateUpdated: string;
}