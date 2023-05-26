import { isDateBetweenTwoDates } from "../utils/isDateBetweenTwoDates.ts";
import { isDateMoreThenAnotherDate } from "../utils/isDateMoreThenAnotherDate.ts";

export const getIsDateBetweenInterval = (
  currentDate: Date | null,
  preselectedDate: Date | null,
  focusedDate: Date | null,
  startDate: Date | null,
  endDate: Date | null
): boolean => {
  if (!currentDate) return false;

  if (preselectedDate && focusedDate) {
    return isDateBetweenTwoDates(
      currentDate,
      isDateMoreThenAnotherDate(focusedDate, preselectedDate)
        ? preselectedDate
        : focusedDate,
      isDateMoreThenAnotherDate(preselectedDate, focusedDate)
        ? preselectedDate
        : focusedDate
    );
  } else if (startDate && endDate) {
    return isDateBetweenTwoDates(currentDate, startDate, endDate);
  }

  return false;
};
