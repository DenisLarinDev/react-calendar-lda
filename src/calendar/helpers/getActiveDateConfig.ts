import { ActiveDateConfig } from "../components/days/dayItem/DayItem.tsx";
import { isDateMoreThenAnotherDate } from "../utils/isDateMoreThenAnotherDate.ts";
import { isDatesEqual } from "../utils/isDatesEqual.ts";

export const getActiveDateConfig = (
  currentDate: Date | null,
  isDateFocused: boolean,
  isDateActive: boolean,
  focusedDate: Date | null,
  preselectedDate: Date | null,
  startDate: Date | null,
  endDate: Date | null
): ActiveDateConfig | null => {
  if (!currentDate) return null;
  if (isDateFocused) {
    if (preselectedDate) {
      return {
        type: "focus",
        position: isDateMoreThenAnotherDate(focusedDate, preselectedDate)
          ? "left"
          : "right",
      };
    } else if (startDate && endDate) {
      if (isDatesEqual(endDate, currentDate)) {
        return {
          type: "focus",
          position: "left",
        };
      }
    }
    return {
      type: "focus",
      position: "right",
    };
  }
  if (isDateActive) {
    if (preselectedDate) {
      return {
        type: "selected",
        position: isDateMoreThenAnotherDate(preselectedDate, focusedDate)
          ? "left"
          : "right",
      };
    } else if (startDate && endDate) {
      if (isDatesEqual(startDate, currentDate)) {
        return {
          type: "selected",
          position: "right",
        };
      } else if (isDatesEqual(endDate, currentDate)) {
        return {
          type: "selected",
          position: "left",
        };
      }
    } else if (startDate) {
      if (isDatesEqual(startDate, currentDate)) {
        return {
          type: "selected",
          position: "single",
        };
      }
    }
  }
  return null;
};
