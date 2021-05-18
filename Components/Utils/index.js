export const handleTimePeriod = (date) => {
  return (
    new Date().getMonth() -
    new Date(date).getMonth() +
    12 * (new Date().getFullYear() - new Date(date).getFullYear())
  );
};
