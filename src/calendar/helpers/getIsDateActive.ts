import { isDatesEqual } from "../utils/isDatesEqual.ts";

export const getIsDateActive = (
  currentDate: Date | null,
  preselectedDate: Date | null,
  startDate: Date | null,
  endDate: Date | null
): boolean => {
  if (!currentDate) return false;

  if (startDate && endDate) {
    return (
      isDatesEqual(currentDate, startDate) || isDatesEqual(currentDate, endDate)
    );
  } else if (preselectedDate) {
    return isDatesEqual(currentDate, preselectedDate);
  } else if (startDate) {
    return isDatesEqual(currentDate, startDate);
  }

  return false;
};
