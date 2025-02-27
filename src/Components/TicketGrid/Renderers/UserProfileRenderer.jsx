import PropTypes from "prop-types";

const UserProfileRenderer = (props) => {
  return (
    <div className="flex items-center">
      <img
        src={props.data[props.colDef.field.split(".")[0]]?.image}
        alt={props.value}
        className="w-8 h-8 rounded-full mr-2"
      />
      <span>{props.value}</span>
    </div>
  );
};

UserProfileRenderer.displayName = "UserProfileRenderer";
UserProfileRenderer.propTypes = {
  value: PropTypes.string.isRequired, // The user's name
  data: PropTypes.shape({
    createdBy: PropTypes.shape({
      name: PropTypes.string,
      image: PropTypes.string,
    }),
    reportedBy: PropTypes.shape({
      name: PropTypes.string,
      image: PropTypes.string,
    }),
    assignedBy: PropTypes.shape({
      name: PropTypes.string,
      image: PropTypes.string,
    }),
    assignedTo: PropTypes.shape({
      name: PropTypes.string,
      image: PropTypes.string,
    }),
    completedBy: PropTypes.shape({
      name: PropTypes.string,
      image: PropTypes.string,
    }),
    retestTo: PropTypes.shape({
      name: PropTypes.string,
      image: PropTypes.string,
    }),
  }).isRequired,
  colDef: PropTypes.shape({
    field: PropTypes.string.isRequired, // The field name (e.g., "createdBy.name")
  }).isRequired,
};

export default UserProfileRenderer;
