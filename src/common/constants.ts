export const TimelineSide = {
	LEFT: "left",
	RIGHT: "right",
} as const;

export type TimelineSide = (typeof TimelineSide)[keyof typeof TimelineSide];

export const ImageType = {
	AI: "ai",
	ORIGINAL: "original",
} as const;

export type ImageType = (typeof ImageType)[keyof typeof ImageType];

export const RoleType = {
	ADMIN: "admin",
	EDITOR: "editor",
	VIEWER: "viewer",
} as const;

export const FormType = {
	POST: "post",
	PUT: "put"
} as const