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
	published: boolean;
}

export interface User {
    _id: string
    username: string
    email: string
    mobile: string
    role: string
    email_verified: boolean
    mobile_verified: boolean
    created_at: string
    updated_at: string
}