import { useState } from "react";
import PropTypes from "prop-types";
import { format, startOfWeek, endOfWeek } from "date-fns";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import DeveloperSummaryTable from "./DeveloperSummaryTable";
//icons
import { HiXMark } from "react-icons/hi2";
import { LiaCalendar } from "react-icons/lia";
import NoData from "../../assets/no-data.png";

const DeveloperWise = ({ developerData }) => {
  const [nameChange, setName] = useState("");
  const [startDate, setStartDate] = useState(startOfWeek(new Date()));
  const [endDate, setEndDate] = useState(endOfWeek(new Date()));
  const [showCalendar, setShowCalendar] = useState(false);
  const [tempStartDate, setTempStartDate] = useState(startOfWeek(new Date()));
  const [tempEndDate, setTempEndDate] = useState(endOfWeek(new Date()));

  const handleWeekChange = (info) => {
    const clickedDate = new Date(info.date);
    if (clickedDate > new Date()) return;

    // Set the temporary week selection
    setTempStartDate(startOfWeek(clickedDate));
    setTempEndDate(endOfWeek(clickedDate));
  };

  const confirmDateSelection = () => {
    // Update actual state with selected dates
    setStartDate(tempStartDate);
    setEndDate(tempEndDate);
    setShowCalendar(false);
  };

  const closeCalendar = (e) => {
    if (e.target.id === "calendar-overlay") {
      setShowCalendar(false);
    }
  };

  const filteredData = developerData.filter((item) => {
    const itemDate = new Date(item.date);
    return itemDate >= startDate && itemDate <= endDate;
  });

  const getWeekText = () => {
    const today = new Date();
    const startOfCurrentWeek = startOfWeek(today);
    const endOfCurrentWeek = endOfWeek(today);

    if (
      startDate.getTime() === startOfCurrentWeek.getTime() &&
      endDate.getTime() === endOfCurrentWeek.getTime()
    ) {
      return "This Week";
    } else {
      return `${format(startDate, "MMM-dd")} - ${format(endDate, "MMM-dd")}`;
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl relative">
      <div className="flex justify-between items-center flex-row mb-4">
        <h2 className="text-[16px] pl-3 font-semibold">Developer Wise</h2>
        <div className="flex gap-x-3 dev-menu">
          <select
            onChange={(e) => setName(e.target.value)}
            className="p-2 border rounded-md border-[#EAEEF7] text-xs"
          >
            <option value="">Select</option>
            <option value="Kannan">Kannan</option>
            <option value="Krishna">Krishna</option>
            <option value="Thamarai">Thamarai</option>
          </select>
          <div className="flex gap-x-4 items-center dev-calendar-sec">
            <h1 className="text-sm  text-[#9F9F9F] ">
              Selected :{" "}
              <span className="text-xs font-semibold text-black">
                {getWeekText()}
              </span>
            </h1>
            <button
              onClick={() => setShowCalendar(true)}
              className="p-2 text-[#535353] cursor-pointer rounded-md text-2xl"
            >
              <LiaCalendar />
            </button>
          </div>
        </div>
      </div>

      {showCalendar && (
        <div
          id="calendar-overlay"
          className="form-overlay flex justify-center items-center z-50"
          onClick={closeCalendar}
        >
          <div className="bg-white w-[400px] h-[450px] p-6 shadow-lg relative">
            <button
              onClick={() => setShowCalendar(false)}
              className="absolute top-2 right-2  cursor-pointer text-[#535353] px-2 py-1 rounded-md text-xl"
            >
              <HiXMark />
            </button>
            <h3 className="text-center text-lg font-semibold mb-3">
              Select a Week
            </h3>
            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              selectable={true}
              dateClick={handleWeekChange}
              dayCellClassNames={({ date }) => {
                const today = new Date();
                if (date > today) return "opacity-50 pointer-events-none";
                return date >= tempStartDate && date <= tempEndDate
                  ? "bg-yellow-300 rounded-md"
                  : "";
              }}
            />
            <div className="flex justify-end mt-4">
              <button
                onClick={confirmDateSelection}
                className="bg-blue-500 text-white px-4 py-2 cursor-pointer rounded-md text-sm"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      {(filteredData.length || nameChange.length) > 0 ? (
        <DeveloperSummaryTable
          data={filteredData}
          columns={["Assigned", "Completed", "Reoccur", "Retest"]}
          nameChange={nameChange}
          startDate={startDate}
          endDate={endDate}
        />
      ) : (
        <div className="text-center text-sm text-gray-500 py-10 flex flex-col items-center">
          <div className="mb-4">
            {" "}
            <img
              src={NoData}
              className="w-[100px] h-[100px]"
              alt="no data found"
            />
          </div>

          <p> No records available for the selected week.</p>
        </div>
      )}
    </div>
  );
};

DeveloperWise.propTypes = {
  developerData: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      assigned: PropTypes.number.isRequired,
      completed: PropTypes.number.isRequired,
      reoccur: PropTypes.number.isRequired,
      retest: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default DeveloperWise;
