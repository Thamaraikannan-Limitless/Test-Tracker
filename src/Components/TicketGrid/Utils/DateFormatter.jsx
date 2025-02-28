import { format, parseISO } from "date-fns";

const DateFormatter = (dateString) => {
  if (!dateString) return "-";

  try {
    const date = parseISO(dateString);
    return format(date, "dd-MMM-EEE"); // Example: 5 Feb
  } catch (error) {
    console.log("Date is invalid:", error);
    return "-";
  }
};

export default DateFormatter;
