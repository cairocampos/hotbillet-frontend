import { DateTime } from "luxon";

interface Composition {
  formatDateIsoToBRL(date: string): string;
  formatDateTimeISO(date: string): string;
}

export function useDateTime(): Composition {
  const formatDateIsoToBRL = (date: string): string => {
    return DateTime.fromISO(date).toFormat("dd/MM/yyyy");
  };

  const formatDateTimeISO = (date: string): string => {
    return DateTime.fromISO(date).toFormat("dd/MM/yyyy HH:mm");
  };

  return {
    formatDateIsoToBRL,
    formatDateTimeISO
  };
}
