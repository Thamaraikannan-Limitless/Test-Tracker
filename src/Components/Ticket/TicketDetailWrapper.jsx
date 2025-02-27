import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from "react-router-dom";

import NoTicketFound from "../../assets/folder-type.png"
import useTicketDisplayStore from "../../Store/TicketDisplayStore";
import TicketDetails from "./TicketDetails";
import { LuArrowLeft } from "react-icons/lu";

const TicketDetailWrapper = () => {
  const { ticketId } = useParams(); // Extract ticketId from the URL
  const navigate = useNavigate();
  const location = useLocation();
  const activeTab = location.state?.activeTab || "All";
  
  // Use the Zustand store
  const { 
    loading, 
    error, 
    fetchTicketById, 
    ticketDetails,
    clearError 
  } = useTicketDisplayStore();
  
  const [currentTicket, setCurrentTicket] = useState(null);
  
  useEffect(() => {
    // Function to fetch and set the ticket data
    const getTicketDetails = async () => {
      if (!ticketId) {
        console.error("ticketId is missing or undefined");
        return;
      }

      const parsedId = parseInt(ticketId, 10);
      if (isNaN(parsedId)) {
        console.error("Invalid ticketId:", ticketId);
        return;
      }

      try {
        // First check if we already have the ticket in the store
        if (ticketDetails[parsedId]) {
          setCurrentTicket(ticketDetails[parsedId]);
          return;
        }
        
        // Otherwise fetch it from the API
        const ticket = await fetchTicketById(parsedId);
        
        if (!ticket) {
          throw new Error("Ticket not found");
        }
        setCurrentTicket(ticket);
      } catch (err) {
        console.error("Error fetching ticket details:", err);
        // Error handling is managed by the store
      }
    };
    
    getTicketDetails();
    
    // Clean up when unmounting
    return () => {
      clearError();
    };
  }, [ticketId, fetchTicketById, ticketDetails, clearError]);

  const handleBack = () => {
    navigate("/ticket", { 
      state: { activeTab }
    });
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        <span className="ml-3 text-gray-600">Loading ticket details...</span>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded-lg shadow-sm">
        <h2 className="text-xl text-red-600 font-semibold mb-2">Error Loading Ticket</h2>
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={handleBack}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded transition duration-200 flex items-center"
        >
          <span className="mr-2"><LuArrowLeft/></span> Back to Tickets
        </button>
      </div>
    );
  }

  // No ticket found state
  if (!currentTicket) {
    return (
      <div className="py-20 text-center flex flex-col items-center">
        <div className="mb-4">
                    {" "}
                    <img
                      src={NoTicketFound}
                      className="w-[100px] h-[100px]"
                      alt="no data found"
                    />
                  </div>
        <div>
        <h2 className="text-xl text-black font-semibold mb-2">Ticket Not Found</h2>
        <p className="text-black mb-4">
          The ticket you&apos;re looking for doesn&apos;t exist or you may not have permission to view it.
          </p>
          </div>
        <button
          onClick={handleBack}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded transition duration-200 flex items-center"
        >
          <span className="mr-2"><LuArrowLeft/></span> Back to Tickets
        </button>
      </div>
    );
  }

  // Success state - render the ticket details
  return <TicketDetails ticket={currentTicket} onBack={handleBack} />;
};

export default TicketDetailWrapper;