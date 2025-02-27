import PropTypes from "prop-types";
const DeveloperSummary = ({ developers }) => {
  return (
    <div className="p-6 bg-[#F5F5F5] rounded-tl-[60px] rounded-br-[60px]">
      <h2 className="text-[14px] font-[600] text-black mb-4">
        Developer-wise Summary of Tickets
      </h2>

      {/* Titles Row */}
      <div className="grid grid-cols-4 gap-4 text-[10px] bg-gray-100 md:p-4 p-2 rounded-t-xl font-[400] text-black">
        <span>Developer Name</span>
        <span className="text-center">Assigned</span>
        <span className="text-center">Completed</span>
        <span className="text-center">Reoccur</span>
      </div>

      {/* Project Data Rows */}
      <div className="space-y-4">
        {developers.map((developer, index) => (
          <div
            key={index}
            className="grid grid-cols-4  gap-4 font-[400] text-[12px] bg-white p-3  rounded-xl shadow-sm hover:bg-gray-100"
          >
            <span className="font-medium text-black">{developer.name}</span>
            <span className="text-center text-black">{developer.assigned}</span>
            <span className="text-center text-black">
              {developer.completed}
            </span>
            <span className="text-center text-black">{developer.reoccur}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

DeveloperSummary.propTypes = {
  developers: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      assigned: PropTypes.number.isRequired,
      completed: PropTypes.number.isRequired,
      reoccur: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default DeveloperSummary;
