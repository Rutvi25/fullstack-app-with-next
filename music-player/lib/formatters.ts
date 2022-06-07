import formatDuration from "format-duration";

export const formatTime = (timeInSeconds: number = 0): string => {
  return formatDuration(timeInSeconds * 1000);
};

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
