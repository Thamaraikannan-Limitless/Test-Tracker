import PropTypes from "prop-types";

// Helper function to normalize status values - same as in other components
const normalizeStatus = (status) => {
  if (!status) return "";

  // Remove spaces and convert to lowercase for consistent comparison
  const normalized = String(status).toLowerCase().replace(/\s+/g, "");

  // Map all possible variations to standardized form
  if (
    (normalized.includes("not") && normalized.includes("done")) ||
    normalized === "nordone" ||
    normalized === "notdone"
  ) {
    return "NotDone";
  }

  // Handle "for retest" variations (with or without spaces)
  if (
    normalized === "forretest" ||
    normalized === "retest" ||
    (normalized.includes("for") && normalized.includes("retest"))
  ) {
    return "ForRetest";
  }

  // Handle other status normalizations
  if (normalized === "done") return "Done";
  if (normalized === "created") return "Created";
  if (normalized === "assigned") return "Assigned";

  // Return original if no match found
  return status;
};

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
    NotDone: {
      color: "bg-[#6141AC] text-white",
      icon: "",
    },
  };

  // First normalize the value to handle variations
  const normalizedValue = normalizeStatus(props.value);

  // Get the status configuration based on the normalized value
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
