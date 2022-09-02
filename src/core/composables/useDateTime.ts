import { DateTime, DurationObjectUnits,  } from "luxon";

interface Composition {
  formatDateIsoToBRL(date: string): string;
  formatDateTimeISO(date: string): string;
  dateDiffNow(date: string): DurationObjectUnits;
}

export function useDateTime(): Composition {
  const formatDateIsoToBRL = (date: string): string => {
    return DateTime.fromISO(date).toFormat("dd/MM/yyyy");
  };

  const formatDateTimeISO = (date: string): string => {
    return DateTime.fromISO(date).toFormat("dd/MM/yyyy HH:mm");
  };

  const dateDiffNow = (date:string) => {
    const dateDiff = DateTime.fromISO(date);
    const diff = DateTime.now().diff(dateDiff, ['days', 'hour', 'minute', 'minutes']);
    return diff.toObject();
  }

  return {
    formatDateIsoToBRL,
    formatDateTimeISO,
    dateDiffNow
  };
}
