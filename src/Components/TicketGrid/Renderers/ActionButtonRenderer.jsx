import PropTypes from "prop-types";

const ActionButtonRenderer = (props) => (
  <button
    onClick={() => props.openAssignForm()}
    className="text-[#034C41] px-4 py-1 border border-[#034C41] cursor-pointer rounded-md text-sm"
  >
    Assign to
  </button>
);

ActionButtonRenderer.displayName = "ActionButtonRenderer";
ActionButtonRenderer.propTypes = {
  openAssignForm: PropTypes.func.isRequired, // Function to open the assign form
};

export default ActionButtonRenderer;