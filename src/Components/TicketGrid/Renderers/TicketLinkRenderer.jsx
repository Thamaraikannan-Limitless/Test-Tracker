import PropTypes from "prop-types";
import PriorityIndicatorRenderer from "./PriorityIndicatorRenderer";

const TicketLinkRenderer = (props) => (
  <div className="flex items-center space-x-1 cursor-pointer">
    <PriorityIndicatorRenderer value={props.data.priority} />
    <a
      onClick={(e) => {
        e.preventDefault();
        props.onSelectTicket(props.data);
      }}
      className="ml-2 cursor-pointer font-semibold text-[#1358D0]"
    >
      {props.value}
    </a>
  </div>
);

TicketLinkRenderer.displayName = "TicketLinkRenderer";
TicketLinkRenderer.propTypes = {
  value: PropTypes.string.isRequired, // The ticket number
  data: PropTypes.shape({
    id: PropTypes.number.isRequired, // Ticket ID
    priority: PropTypes.string.isRequired, // Ticket priority
  }).isRequired,
  onSelectTicket: PropTypes.func.isRequired, // Function to handle ticket selection
};

export default TicketLinkRenderer;