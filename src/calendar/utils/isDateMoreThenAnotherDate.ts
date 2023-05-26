export const isDateMoreThenAnotherDate = (
  date1: Date | null,
  date2: Date | null
) => {
  if (!date1 || !date2) return null;
  const tempDate1 = new Date(date1);
  tempDate1.setHours(0, 0, 0, 0);
  const tempDate2 = new Date(date2);
  tempDate2.setHours(0, 0, 0, 0);
  return tempDate1.getTime() > tempDate2.getTime();
};
