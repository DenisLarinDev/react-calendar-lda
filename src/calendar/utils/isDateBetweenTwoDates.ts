export const isDateBetweenTwoDates = (
  date: Date | null,
  startDate: Date | null,
  endDate: Date | null
) => {
  if (!date || !startDate || !endDate) return false;
  const tempDate = new Date(date);
  const tempStart = new Date(startDate);
  const tempEnd = new Date(endDate);
  return (
    tempDate.getTime() >= tempStart.getTime() &&
    tempDate.getTime() <= tempEnd.getTime()
  );
};
