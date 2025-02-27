import PropTypes from "prop-types";

const PriorityIndicatorRenderer = (params) => {
  const priorityColors = {
    High: "bg-[#E2445C]",
    Medium: "bg-[#FDAB3D]",
    Low: "bg-[#DBC72D]",
  };

  return (
    <span
      className={`w-3 h-3 inline-block rounded-full mr-1 ${
        priorityColors[params.value] || "bg-gray-300"
      }`}
    ></span>
  );
};

PriorityIndicatorRenderer.displayName = "PriorityIndicatorRenderer";
PriorityIndicatorRenderer.propTypes = {
  value: PropTypes.string.isRequired, // The priority value
};

export default PriorityIndicatorRenderer;