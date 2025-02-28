import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import useTicketDisplayStore from "../../Store/TicketDisplayStore";
import TicketTables from "../TicketGrid/TicketTables";
import TicketBtn from "./TicketBtn";

const TicketDisplay = ({ defaultTab = "All" }) => {
  // Use the Zustand store
  const { tickets, loading, error, fetchAllTickets, clearError } =
    useTicketDisplayStore();

  const navigate = useNavigate();

  // Fetch tickets when component mounts
  useEffect(() => {
    fetchAllTickets();
  }, [fetchAllTickets]);

  const handleRefresh = () => {
    fetchAllTickets();
  };

  const handleTicketSelect = (ticket, activeTab) => {
    navigate(`/tickets/${ticket.id}`, {
      state: { activeTab },
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        Loading tickets...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <div className="text-red-500 mb-4">{error}</div>
        <button
          onClick={() => {
            clearError();
            handleRefresh();
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <>
      <TicketBtn />
      <div className="py-2">
        <section>
          <TicketTables
            tickets={tickets}
            onSelectTicket={handleTicketSelect}
            initialActiveTab={defaultTab}
          />
        </section>
      </div>
    </>
  );
};

TicketDisplay.propTypes = {
  defaultTab: PropTypes.string,
};

export default TicketDisplay;
