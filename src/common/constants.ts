export const TimelineSide = {
  LEFT: "left",
  RIGHT: "right",
} as const;

export type TimelineSide = typeof TimelineSide[keyof typeof TimelineSide];

export const ImageType = {
  AI_GENERATED: "AI Generated",
  ACTUAL_PICTURE: "Actual Picture",
} as const;

export type ImageType = typeof ImageType[keyof typeof ImageType];
