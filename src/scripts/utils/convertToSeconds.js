export const convertToSeconds = ({ hours, minutes, seconds }) => {
  return (hours * 3600) + (minutes * 60) + seconds;
};
