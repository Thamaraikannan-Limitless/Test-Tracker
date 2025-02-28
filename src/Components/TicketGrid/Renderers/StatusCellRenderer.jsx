import PropTypes from "prop-types";

const StatusCellRenderer = (params) => {
  // Enhanced status normalization function
  const normalizeStatus = (status) => {
    if (!status) return "";

    // First, save the original formatting of "not done" with space
    // This ensures we return "Not Done" instead of "NotDone" for display if needed
    const hasSpaceInNotDone = status.toLowerCase().includes("not done");

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

  const statusColors = {
    Created: "bg-[#ECBF50] text-white", //view, assign to
    Assigned: "bg-[#E5927A] text-white", // view, send for Retest,re assign to
    ForRetest: "bg-[#FF0000] text-white", // view,close ticket,
    Done: "bg-[#00C875] text-white", //view
    NotDone: "bg-[#6141AC] text-white", //view,for retest
  };

  // Get the normalized status
  const normalizedStatus = normalizeStatus(params.value);

  // Get the CSS class based on the normalized status
  const cssClass = statusColors[normalizedStatus] || "bg-gray-300";

  return (
    <span className={`px-2 py-1 rounded ${cssClass}`}>{params.value}</span>
  );
};

StatusCellRenderer.displayName = "StatusCellRenderer";
StatusCellRenderer.propTypes = {
  value: PropTypes.string.isRequired, // The status value
};

export default StatusCellRenderer;
