import { formatDuration, intervalToDuration } from "date-fns";
import { id } from "date-fns/locale";

export const formatMinutesToHoursAndMinutes = (minutes: number) => {
  const duration = intervalToDuration({ start: 0, end: minutes * 60 * 1000 });

  const formatted = formatDuration(duration, {
    locale: id,
    format: ["hours", "minutes"],
    zero: false,
  });

  // Jika tidak ada jam (kurang dari 60 menit)
  if (!duration.hours) {
    return `${duration.minutes} menit`;
  }

  return formatted.replace("jam", "j").replace("menit", "m");
};
