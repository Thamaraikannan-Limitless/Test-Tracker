import React from "react";
import PropTypes from "prop-types";

const UserProfileRenderer = (props) => {
  const getInitials = (name) => {
    if (!name) return "?";

    // Split the name by spaces and get initials
    const nameParts = name.split(" ");
    if (nameParts.length === 1) {
      // Only one word, return first letter
      return nameParts[0].charAt(0).toUpperCase();
    } else {
      // Multiple words, return first letter of first two words
      return (nameParts[0].charAt(0) + nameParts[1].charAt(0)).toUpperCase();
    }
  };

  // Get the user object based on the field path
  const fieldPath = props.colDef.field.split(".");
  const userObject = props.data[fieldPath[0]];

  // Get display value - use the value directly
  const displayValue = props.value || "";

  // Get initials based on what's actually displayed
  const initials = getInitials(displayValue);

  return (
    <div className="flex items-center">
      {/* Circular avatar with initials - light gray background with black text */}
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center text-black font-medium mr-2 flex-shrink-0"
        style={{ backgroundColor: "#E5E7EB" }}
      >
        {initials}
      </div>
      <span className="truncate">{displayValue}</span>
    </div>
  );
};

UserProfileRenderer.displayName = "UserProfileRenderer";
UserProfileRenderer.propTypes = {
  value: PropTypes.string, // The displayed value
  data: PropTypes.object.isRequired, // The row data
  colDef: PropTypes.shape({
    field: PropTypes.string.isRequired, // The field name
  }).isRequired,
};

export default UserProfileRenderer;
