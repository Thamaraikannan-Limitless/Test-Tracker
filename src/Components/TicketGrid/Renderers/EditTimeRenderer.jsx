import PropTypes from "prop-types";
import { FaSquarePlus } from "react-icons/fa6";
import { MdOutlineModeEdit } from "react-icons/md";

const EditTimeRenderer = (props) => {
  // If the value is empty or null, plus icon
  if (!props.value) {
    return (
      <div className="flex items-center ms-10 mt-2">
        <button
          onClick={props.onClick}
          className="text-green-600 rounded-md cursor-pointer text-xl"
        >
          <FaSquarePlus />
        </button>
      </div>
    );
  }

  // Otherwise time with edit button
  return (
    <div className="flex items-center">
      <span className="mr-2">{props.value}</span>
      <button
        onClick={props.onClick}
        className=" hover:text-gray-700 cursor-pointer ms-2 text-[#9F9F9F] text-lg"
      >
        <MdOutlineModeEdit />
      </button>
    </div>
  );
};

EditTimeRenderer.displayName = "EditTimeRenderer";
EditTimeRenderer.propTypes = {
  value: PropTypes.string, // The time value (optional)
  onClick: PropTypes.func.isRequired, // Function to handle click events
};

export default EditTimeRenderer;