import { months } from "../configs/months.ts";

export const getMonth = (month: number) => {
  let index = month;
  if (index < 0) index = 11;
  if (index > 11) index = 0;
  return months[index];
};
