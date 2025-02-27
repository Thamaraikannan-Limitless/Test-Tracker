const DateFormatter = (dateString) => {
  if (!dateString) return "-";

  const date = new Date(dateString);

  // Check if the date is valid
  if (isNaN(date.getTime())) return "-";

  // Array of month names
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Get day and month
  const day = date.getDate();
  const month = months[date.getMonth()];

  // Return formatted date
  return `${day} ${month}`;
};

export default DateFormatter;
