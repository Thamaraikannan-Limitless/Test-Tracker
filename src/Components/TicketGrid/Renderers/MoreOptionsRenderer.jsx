import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { FiMoreVertical } from "react-icons/fi";
import MenuManager from "../Utils/MenuManager";

const MoreOptionsRenderer = (props) => {
  const { status } = props.data;
  const rowId = props.data.id;
  const [isOpen, setIsOpen] = useState(false);

  // Subscribe to menu changes
  useEffect(() => {
    const unsubscribe = MenuManager.subscribe((activeMenuId) => {
      // Only update state if necessary to avoid unnecessary renders
      if (isOpen && activeMenuId !== rowId) {
        setIsOpen(false);
      }
    });

    // Clean up subscription
    return unsubscribe;
  }, [rowId, isOpen]);

  const handleToggle = (event) => {
    // Stop propagation to prevent the document click handler from firing
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();

    if (!isOpen) {
      // Open this menu and notify the manager
      MenuManager.setActiveMenu(rowId);
      setIsOpen(true);
    } else {
      // Close this menu
      MenuManager.setActiveMenu(null);
      setIsOpen(false);
    }
  };

  const handleMenuItemClick = (callback) => (event) => {
    // Stop propagation to prevent document click handler
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();

    // Execute the callback
    callback(props.data);

    // Close the menu
    MenuManager.setActiveMenu(null);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={handleToggle}
        className="cursor-pointer text-sm focus:outline-none"
      >
        <FiMoreVertical className="cursor-pointer mt-4" />
      </button>
      {isOpen && (
        <div
          className="fixed right-7 mr-2 top-0 bg-white border border-gray-300 rounded-md shadow-lg z-20 w-40"
          onClick={(e) => {
            e.stopPropagation();
            e.nativeEvent.stopImmediatePropagation();
          }}
        >
          <ul className="text-sm">
            {/* View - Available for all statuses */}
            <li
              className="px-4 py-2 border-b border-[#cfcfcf] hover:bg-gray-100 cursor-pointer"
              onClick={handleMenuItemClick(props.context.onSelectTicket)}
            >
              View
            </li>

            {/* Assign to - Only for Created status */}
            {(status === "Created" || status === "All") && (
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={handleMenuItemClick(props.context.onAssignTicket)}
              >
                Assign to
              </li>
            )}

            {/* Send for Retest & Reassign to - Only for Assigned status */}
            {(status === "Assigned" || status === "All") && (
              <>
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={handleMenuItemClick(props.context.onSendForRetest)}
                >
                  Send for Retest
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={handleMenuItemClick(props.context.onReassignTicket)}
                >
                  Reassign to
                </li>
              </>
            )}

            {/* Close Ticket - Only for ForRetest status */}
            {(status === "ForRetest" || status === "All") && (
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={handleMenuItemClick(props.context.onCloseTicket)}
              >
                Close Ticket
              </li>
            )}

            {/* Send for Retest - Only for NotDone status */}
            {status === "NotDone" && (
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={handleMenuItemClick(props.context.onSendForRetest)}
              >
                Send for Retest
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

MoreOptionsRenderer.displayName = "MoreOptionsRenderer";

MoreOptionsRenderer.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number.isRequired, // Ticket ID
    status: PropTypes.oneOf([
      "Created",
      "Assigned",
      "ForRetest",
      "Done",
      "NotDone",
      "All", // Added for handling the "All" status
    ]).isRequired, // Ticket status
  }).isRequired,
  context: PropTypes.shape({
    onSelectTicket: PropTypes.func.isRequired, // Function to handle ticket selection
    onAssignTicket: PropTypes.func, // Function to handle ticket assignment
    onSendForRetest: PropTypes.func, // Function to handle sending for retest
    onReassignTicket: PropTypes.func, // Function to handle reassignment
    onCloseTicket: PropTypes.func, // Function to handle closing the ticket
  }).isRequired,
};

export default MoreOptionsRenderer;
