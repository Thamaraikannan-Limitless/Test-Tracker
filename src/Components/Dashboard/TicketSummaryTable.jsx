import PropTypes from "prop-types";
import { format } from "date-fns";
const TicketSummaryTable = ({ data, columns, startDate, endDate }) => {
  const totals = columns.reduce((acc, col) => {
    acc[col.toLowerCase()] = data.reduce(
      (sum, item) => sum + item[col.toLowerCase()],
      0
    );
    return acc;
  }, {});

  return (
    <table className="w-full text-left border-collapse">
      <thead>
        <tr>
          <th className="pt-2 text-xs pb-2 text-[#9F9F9F] font-[600]">
            {format(startDate, "MMM-dd")} - {format(endDate, "MMM-dd")}
          </th>
          {columns.map((col) => (
            <th
              key={col}
              className="text-xs font-[600] text-[#9F9F9F] whitespace-nowrap"
            >
              {col}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td className="pt-2 border-b pb-2 text-sm font-semibold border-[#D9D9D9] whitespace-nowrap">
              {format(new Date(item.date),"MMM-dd-EEE")}
            </td>
            {columns.map((col) => (
              <td
                key={col}
                className="p-2 border-b border-[#D9D9D9] text-sm font-[400] whitespace-nowrap"
              >
                {item[col.toLowerCase()]}
              </td>
            ))}
          </tr>
        ))}
        <tr className="font-[600]">
          <td className="p-2 border-b border-[#D9D9D9]"></td>
          {columns.map((col) => (
            <td
              key={col}
              className="p-2 border-b border-[#D9D9D9] whitespace-nowrap"
            >
              {totals[col.toLowerCase()]}
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  );
};

TicketSummaryTable.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      assigned: PropTypes.number.isRequired,
      completed: PropTypes.number.isRequired,
      reoccur: PropTypes.number.isRequired,
      retest: PropTypes.number.isRequired,
    })
  ).isRequired,
  columns: PropTypes.arrayOf(PropTypes.string).isRequired,
  startDate: PropTypes.instanceOf(Date).isRequired,
  endDate: PropTypes.instanceOf(Date).isRequired,
};
export default TicketSummaryTable;