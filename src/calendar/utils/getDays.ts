import { IDayItem } from "../models/IDayItem.ts";

const isWeekend = (date: Date) => {
  return date.getDay() === 6 || date.getDay() === 0;
};
const fillLeftPartOfWeek = (date: Date, index: number, week: IDayItem[]) => {
  const iterationDate = new Date(date);
  iterationDate.setDate(iterationDate.getDate() - 1);
  let steps = index;
  while (steps >= 0) {
    week[steps] = {
      date: new Date(iterationDate),
      isWeekend: isWeekend(iterationDate),
      isPrevMonth: true,
      isNextMonth: false,
    };
    iterationDate.setDate(iterationDate.getDate() - 1);
    steps -= 1;
  }
};

const addDaysOfNextMonth = (date: Date, days: IDayItem[][]): void => {
  const iterationDate = new Date(date);
  days.forEach((week) => {
    while (week.length !== 7) {
      week.push({
        date: new Date(iterationDate),
        isNextMonth: true,
        isPrevMonth: false,
        isWeekend: isWeekend(iterationDate),
      });
      iterationDate.setDate(iterationDate.getDate() + 1);
    }
  });
};

export const getDays = (focusDate: Date) => {
  const iterationDate = new Date(focusDate);
  iterationDate.setDate(1);
  iterationDate.setHours(0, 0, 0, 0);
  const currentMonth = iterationDate.getMonth();
  const result: IDayItem[][] = [[], [], [], [], [], []];
  let weekNumber = 0;
  while (currentMonth === iterationDate.getMonth()) {
    let currentWeek = result[weekNumber];
    if (!Array.isArray(currentWeek)) currentWeek = [];
    const indexOfDay =
      iterationDate.getDay() === 0 ? 6 : iterationDate.getDay() - 1;

    if (currentWeek.length === 0 && indexOfDay !== 0) {
      fillLeftPartOfWeek(iterationDate, indexOfDay - 1, currentWeek);
    }
    currentWeek[indexOfDay] = {
      date: new Date(iterationDate),
      isNextMonth: false,
      isPrevMonth: false,
      isWeekend: isWeekend(iterationDate),
    };
    if (currentWeek.length === 7) weekNumber++;
    iterationDate.setDate(iterationDate.getDate() + 1);
  }
  addDaysOfNextMonth(iterationDate, result);
  return result;
};
