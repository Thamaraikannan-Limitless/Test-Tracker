import PropTypes from "prop-types";
import { format } from "date-fns";

import userImage from "../../assets/alexander-hipp-iEEBWgY_6lA-unsplash.jpg";
const DeveloperSummaryTable = ({ data, columns, nameChange, startDate, endDate }) => {
  const totals = columns.reduce((acc, col) => {
    acc[col.toLowerCase()] = data.reduce(
      (sum, item) => sum + item[col.toLowerCase()],
      0
    );
    return acc;
  }, {});

  return (
    <div className="flex gap-x-10 flex-col md:flex-row">
      <div className="md:w-[150px] w-[80px] text-center pt-2 dev-profile-section ">
        <img
          className="w-18 h-18 max-w-[120%] rounded-full"
          src={userImage}
          alt="User Profile"
        />
        <h4 className="pt-2 text-xs font-semibold">{nameChange}</h4>
        <p className="text-xs font-light">Developer</p>
      </div>
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
                {format(new Date(item.date), "MMM-dd-EEE")}
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
    </div>
  );
};

DeveloperSummaryTable.propTypes = {
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
  nameChange: PropTypes.string.isRequired,
  startDate: PropTypes.instanceOf(Date).isRequired,
  endDate: PropTypes.instanceOf(Date).isRequired,
};

export default DeveloperSummaryTable;