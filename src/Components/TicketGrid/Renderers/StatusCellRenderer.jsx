import PropTypes from "prop-types";

const StatusCellRenderer = (params) => {
  const statusColors = {
    Created: "bg-[#ECBF50] text-white", //view, assign to
    Assigned: "bg-[#E5927A] text-white", // view, send for Retest,re assign to
    ForRetest: "bg-[#FF0000] text-white", // view,close ticket,
    Done: "bg-[#00C875] text-white", //view
    NotDone: "bg-[#6141AC] text-white", //view,for retest
  };

  return (
    <span
      className={`px-2 py-1 rounded ${
        statusColors[params.value] || "bg-gray-300"
      }`}
    >
      {params.value}
    </span>
  );
};

StatusCellRenderer.displayName = "StatusCellRenderer";
StatusCellRenderer.propTypes = {
  value: PropTypes.string.isRequired, // The status value
};

export default StatusCellRenderer;
