import { DateTime } from "luxon";

interface Composition {
  formatDateIsoToBRL(date: string): string;
}

export function useDateTime(): Composition {
  const formatDateIsoToBRL = (date: string): string => {
    return DateTime.fromISO(date).toFormat("dd/mm/yyyy");
  };

  return {
    formatDateIsoToBRL,
  };
}
