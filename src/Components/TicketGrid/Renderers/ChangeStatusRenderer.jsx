import PropTypes from "prop-types";

const ChangeStatusRenderer = (props) => {
  const statuses = {
    ForRetest: {
      color: "bg-[#FF0000] text-white",
      icon: "0",
    },
    Done: {
      color: "bg-[#00C875] text-white",
      icon: "",
    },
  };

  const normalizedValue =
    props.value === "ForReTest" ? "ForRetest" : props.value;
  const status = statuses[normalizedValue];

  return (
    <div className="flex items-center">
      <span
        className={`px-3 py-1 text-sm mt-1 rounded ${
          status?.color || "bg-gray-300 text-white"
        }`}
      >
        {props.value}
      </span>
      {status?.icon && (
        <span className="ml-2 w-6 h-6 flex items-center justify-center rounded-full bg-red-600 text-white text-xs">
          {status.icon}
        </span>
      )}
    </div>
  );
};

ChangeStatusRenderer.displayName = "ChangeStatusRenderer";
ChangeStatusRenderer.propTypes = {
  value: PropTypes.string.isRequired, // The status value
};

export default ChangeStatusRenderer;