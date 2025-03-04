import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import PropTypes from "prop-types";
import TableHeader from "./TableHeader";
import TableFilters from "./TableFilters";
import TicketAssignForm from "../Ticket/TicketAssignForm";
import AverageTime from "../Ticket/AverageTime";
import ReassignForm from "../Ticket/ReassignForm";
import RetestForm from "../Ticket/RetestForm";
import TicketCloseForm from "../Ticket/TicketCloseForm";
import personImg from "../../assets/alexander-hipp-iEEBWgY_6lA-unsplash.jpg";
import {
  getCreatedTabColumns,
  getAssignedTabColumns,
  getCompletedTabColumns,
  getDefaultColumns,
} from "./ColumnDefinition";
import DateFormatter from "./Utils/DateFormatter";

ModuleRegistry.registerModules([AllCommunityModule]);

// Helper function to normalize status values
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
    return "NotDone"; // Standardized form
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

  // If no match found, return the original (this helps with debugging)
  return status;
};

const TicketTables = ({
  tickets,
  onSelectTicket,
  initialActiveTab = "All",
}) => {
  const navigate = useNavigate();
  const [paginationPageSize, setPaginationPageSize] = useState(10);
  const [activeTab, setActiveTab] = useState(initialActiveTab);
  const [searchQuery, setSearchQuery] = useState("");
  const [hiddenColumns, setHiddenColumns] = useState([]);
  const [appliedFilters, setAppliedFilters] = useState({});
  const [gridData, setGridData] = useState([]);
  const [isAssignFormOpen, setIsAssignFormOpen] = useState(false);
  const [isAverageTimeFormOpen, setIsAverageTimeFormOpen] = useState(false);
  const [isReassignFormOpen, setIsReassignFormOpen] = useState(false);
  const [isRetestFormOpen, setIsRetestFormOpen] = useState(false);
  const [isCloseFormOpen, setIsCloseFormOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const gridRef = useRef(null);

  // Handle tab changes with routing
  const handleTabChange = useCallback(
    (newTab) => {
      setActiveTab(newTab);

      // Update the URL based on the selected tab
      switch (newTab) {
        case "All":
          navigate("/ticket");
          break;
        case "Created":
          navigate("/ticket/created");
          break;
        case "Assigned":
          navigate("/ticket/assigned");
          break;
        case "Completed":
        case "ForReTest":
        case "Done":
        case "NotDone":
          navigate("/ticket/completed");
          break;
        default:
          navigate("/ticket");
      }
    },
    [navigate]
  );

  // Use useCallback to memoize handler functions for better performance
  const handleTicketSelect = useCallback(
    (ticket) => {
      onSelectTicket(ticket, activeTab);
    },
    [onSelectTicket, activeTab]
  );

  // Function to open the assign form
  const openAssignForm = useCallback((ticket) => {
    setSelectedTicket(ticket);
    setIsAssignFormOpen(true);
  }, []);

  // Function to close the assign form
  const closeAssignForm = useCallback(() => {
    setIsAssignFormOpen(false);
    setSelectedTicket(null);
  }, []);

  // Average time form function
  const openAverageTimeForm = useCallback((ticket) => {
    setSelectedTicket(ticket);
    setIsAverageTimeFormOpen(true);
  }, []);

  const closeAverageTimeForm = useCallback(() => {
    setIsAverageTimeFormOpen(false);
    setSelectedTicket(null);
  }, []);

  // Reassign form function
  const openReassignForm = useCallback((ticket) => {
    setSelectedTicket(ticket);
    setIsReassignFormOpen(true);
  }, []);

  const closeReassignForm = useCallback(() => {
    setIsReassignFormOpen(false);
    setSelectedTicket(null);
  }, []);

  // ReTest form function
  const openRetestForm = useCallback((ticket) => {
    setSelectedTicket(ticket);
    setIsRetestFormOpen(true);
  }, []);

  const closeRetestForm = useCallback(() => {
    setIsRetestFormOpen(false);
    setSelectedTicket(null);
  }, []);

  // Close form function
  const openCloseForm = useCallback((ticket) => {
    setSelectedTicket(ticket);
    setIsCloseFormOpen(true);
  }, []);

  const closeCloseForm = useCallback(() => {
    setIsCloseFormOpen(false);
    setSelectedTicket(null);
  }, []);

  // Process tickets based on activeTab
  useEffect(() => {
    if (!tickets || tickets.length === 0) {
      setGridData([]);
      return;
    }

    // Map API data structure to the structure expected by our grid components
    const formattedTickets = tickets.map((ticket) => ({
      id: ticket.ticketId || ticket.id,
      ticket: ticket.ticketNumber,
      priority: ticket.priority,
      project: ticket.projectName,
      projectId: ticket.projectId,
      status: normalizeStatus(ticket.status), // Normalize status here

      // Created tab fields
      createdOn: ticket.ticketDate || ticket.reportedOn,
      createdOnFormatted: DateFormatter(ticket.ticketDate || ticket.reportedOn),
      createdBy: {
        name: ticket.reportedByName,
        image: personImg,
      },
      reportedBy: {
        name: ticket.reportedByName,
        image: personImg,
      },

      // Assigned tab fields
      assignedOn: ticket.assignedDate,
      assignedOnFormatted: DateFormatter(ticket.assignedDate),
      assignedBy: {
        name: ticket.assignedToName,
        image: personImg,
      },
      assignedTo: {
        name: ticket.assignedToName,
        id: ticket.assignedToId,
        image: personImg,
      },
      averageTime:
        ticket.averageWorkingHours > 0 || ticket.averageWorkingMinutes > 0
          ? `${ticket.averageWorkingHours || 0}h ${
              ticket.averageWorkingMinutes || 0
            }m`
          : null,

      // Completed tab fields
      completedOn: ticket.completedOn,
      completedOnFormatted: DateFormatter(ticket.completedOn),
      completedBy: {
        name: ticket.completedByName,
        id: ticket.completedById,
        image: personImg,
      },
      retestTo: {
        name: ticket.reTestByName,
        id: ticket.reTestById,
        image: personImg,
      },
      timeToFinish:
        ticket.averageWorkingHours > 0 || ticket.averageWorkingMinutes > 0
          ? `${ticket.averageWorkingHours || 0}h ${
              ticket.averageWorkingMinutes || 0
            }m`
          : "-",

      // For "Change Status" column
      changeStatus: ticket.status, // Keep original for reference

      //  API fields (kept for reference and data manipulation)
      bugDescription: ticket.bugDescription,
      bugDetails: ticket.bugDetails,
      averageWorkingHours: ticket.averageWorkingHours || 0,
      averageWorkingMinutes: ticket.averageWorkingMinutes || 0,
    }));

    let filteredTickets = [...formattedTickets];

    // Filter by tab with standardized status values
    if (activeTab === "Created") {
      filteredTickets = formattedTickets.filter(
        (ticket) => ticket.status === "Created"
      );
    } else if (activeTab === "Assigned") {
      filteredTickets = formattedTickets.filter(
        (ticket) => ticket.status === "Assigned"
      );
    } else if (activeTab === "Completed") {
      filteredTickets = formattedTickets.filter(
        (ticket) =>
          ticket.status === "Done" ||
          ticket.status === "ForRetest" ||
          ticket.status === "NotDone"
      );
    } else if (activeTab !== "All") {
      filteredTickets = formattedTickets.filter(
        (ticket) => ticket.status === activeTab
      );
    }

    setGridData(filteredTickets);
    setHiddenColumns([]);
  }, [activeTab, tickets]);

  // Filter logic for search and filters
  const filteredData = gridData.filter((ticket) => {
    // Search query filter
    const matchesSearch =
      searchQuery === "" ||
      ticket.ticket?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.project?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.bugDescription?.toLowerCase().includes(searchQuery.toLowerCase());

    // Enhanced filter matching logic with better type handling
    const matchesFilters = Object.entries(appliedFilters).every(
      ([key, value]) => {
        if (!value) return true;

        // Handle special field mappings
        // Check for nested properties first (contains ".")
        if (key.includes(".")) {
          const [parent, child] = key.split(".");
          if (!ticket[parent] || !ticket[parent][child]) return false;

          // Try both string and number comparisons
          const ticketValue = ticket[parent][child];
          if (typeof ticketValue === "number") {
            return (
              ticketValue === Number(value) || String(ticketValue) === value
            );
          }
          return ticketValue.toLowerCase() === value.toLowerCase();
        }

        // Handle other specific cases
        switch (key) {
          case "project":
            // Project might be an ID in the filter but a name in the ticket
            // Need to properly handle string vs number comparisons
            return (
              ticket.project?.toLowerCase() === value.toLowerCase() ||
              ticket.projectName?.toLowerCase() === value.toLowerCase() ||
              ticket.projectId === Number(value) || // Convert string to number
              String(ticket.projectId) === value // Convert number to string
            );

          case "developer":
            // Developer is stored in assignedTo
            return (
              ticket.assignedTo?.name?.toLowerCase() === value.toLowerCase() ||
              (ticket.assignedTo?.id !== undefined &&
                (ticket.assignedTo.id === Number(value) ||
                  String(ticket.assignedTo.id) === value))
            );

          case "tester":
            // Tester could be in retestTo or completedBy depending on the status
            return (
              (ticket.retestTo?.name &&
                ticket.retestTo.name.toLowerCase() === value.toLowerCase()) ||
              (ticket.retestTo?.id !== undefined &&
                (ticket.retestTo.id === Number(value) ||
                  String(ticket.retestTo.id) === value)) ||
              (ticket.completedBy?.name &&
                ticket.completedBy.name.toLowerCase() ===
                  value.toLowerCase()) ||
              (ticket.completedBy?.id !== undefined &&
                (ticket.completedBy.id === Number(value) ||
                  String(ticket.completedBy.id) === value))
            );

          case "status":
            // Apply status normalization for filters too
            return normalizeStatus(ticket.status) === normalizeStatus(value);

          // Default case: direct property match (priority, etc.)
          default:
            if (ticket[key] === undefined) return false;

            // Handle different data types
            if (typeof ticket[key] === "number") {
              return (
                ticket[key] === Number(value) || String(ticket[key]) === value
              );
            }
            if (typeof ticket[key] === "string") {
              return ticket[key].toLowerCase() === value.toLowerCase();
            }
            // For other types, convert both to strings and compare
            return (
              String(ticket[key]).toLowerCase() === String(value).toLowerCase()
            );
        }
      }
    );

    return matchesSearch && matchesFilters;
  });

  // Get appropriate columns based on active tab
  const getColumnsForTab = useCallback(() => {
    switch (activeTab) {
      case "Created":
        return getCreatedTabColumns(handleTicketSelect, openAssignForm);
      case "Assigned":
        return getAssignedTabColumns(
          handleTicketSelect,
          openAverageTimeForm,
          openReassignForm,
          openRetestForm
        );
      case "Completed":
      case "ForReTest":
      case "Done":
      case "NotDone": // Added to support the new status
        return getCompletedTabColumns(handleTicketSelect, openCloseForm);
      default:
        return getDefaultColumns(
          handleTicketSelect,
          openAssignForm,
          openReassignForm,
          openRetestForm,
          openCloseForm
        );
    }
  }, [
    activeTab,
    handleTicketSelect,
    openAssignForm,
    openAverageTimeForm,
    openReassignForm,
    openRetestForm,
    openCloseForm,
  ]);

  const allColumns = getColumnsForTab();

  // Filter columns based on preferences
  const columnDefs = allColumns.filter(
    (col) => !hiddenColumns.includes(col.field)
  );

  const defaultColDef = {
    resizable: true,
    filter: false,
    sortable: false,
    cellStyle: { border: "none" },
  };

  const handleApplyFilters = useCallback((filters) => {
    setAppliedFilters(filters);
  }, []);

  const clearFilter = useCallback((key) => {
    setAppliedFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters };
      delete updatedFilters[key];
      return updatedFilters;
    });
  }, []);

  const clearAllFilters = useCallback(() => {
    setAppliedFilters({});
  }, []);

  return (
    <div className="">
      <TableHeader activeTab={activeTab} setActiveTab={handleTabChange} />

      <TableFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        appliedFilters={appliedFilters}
        clearFilter={clearFilter}
        clearAllFilters={clearAllFilters}
        onApplyFilters={handleApplyFilters}
        allColumns={allColumns}
        hiddenColumns={hiddenColumns}
        setHiddenColumns={setHiddenColumns}
      />

      {/* Overlay */}
      {(isAssignFormOpen ||
        isAverageTimeFormOpen ||
        isReassignFormOpen ||
        isRetestFormOpen ||
        isCloseFormOpen) && (
        <div
          className="fixed inset-0 bg-[#00000080] bg-opacity-50 z-10"
          onClick={() => {
            closeAssignForm();
            closeAverageTimeForm();
            closeReassignForm();
            closeRetestForm();
            closeCloseForm();
          }}
        ></div>
      )}

      {/* TicketAssignForm */}
      <div
        className={`fixed md:top-[72px] top-[56px] right-0 h-full max-h-screen md:w-[480px] bg-[#EDEDED] z-20 w-[380px] shadow-md transform ${
          isAssignFormOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-500 ease-in-out overflow-y-auto`}
      >
        {isAssignFormOpen && (
          <TicketAssignForm ticket={selectedTicket} onClose={closeAssignForm} />
        )}
      </div>

      {/* AverageTime Form */}
      <div
        className={`fixed md:top-[30%] top-[20%] right-[36%] md:w-[480px] bg-white z-20 w-[380px] rounded-md transform ${
          isAverageTimeFormOpen ? "translate-y-0" : "translate-y-full"
        } transition-transform duration-500 ease-in-out overflow-y-auto`}
      >
        {isAverageTimeFormOpen && (
          <AverageTime ticket={selectedTicket} onClose={closeAverageTimeForm} />
        )}
      </div>

      {/* ReassignForm */}
      <div
        className={`fixed md:top-[72px] top-[56px] right-0 h-full max-h-screen md:w-[480px] bg-[#EDEDED] z-20 w-[380px] shadow-md transform ${
          isReassignFormOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-500 ease-in-out overflow-y-auto`}
      >
        {isReassignFormOpen && (
          <ReassignForm ticket={selectedTicket} onClose={closeReassignForm} />
        )}
      </div>

      {/* ReTestForm */}
      <div
        className={`fixed md:top-[72px] top-[56px] right-0 h-full max-h-screen md:w-[480px] bg-[#EDEDED] z-20 w-[380px] shadow-md transform ${
          isRetestFormOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-500 ease-in-out overflow-y-auto`}
      >
        {isRetestFormOpen && (
          <RetestForm ticket={selectedTicket} onClose={closeRetestForm} />
        )}
      </div>

      {/* CloseForm */}
      <div
        className={`fixed md:top-[72px] top-[56px] right-0 h-full max-h-screen md:w-[480px] bg-[#EDEDED] z-20 w-[380px] shadow-md transform ${
          isCloseFormOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-500 ease-in-out overflow-y-auto`}
      >
        {isCloseFormOpen && (
          <TicketCloseForm ticket={selectedTicket} onClose={closeCloseForm} />
        )}
      </div>

      <div className="ag-theme-quartz h-[450px] w-full overflow-x-auto">
        <AgGridReact
          rowData={filteredData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          pagination={true}
          suppressMultiSortPriority={true}
          paginationPageSize={paginationPageSize}
          paginationPageSizeSelector={[10, 25, 50, 100]}
          onGridReady={(params) => {
            gridRef.current = params;
          }}
          onPaginationChanged={(params) => {
            setPaginationPageSize(params.api.paginationGetPageSize());
          }}
          context={{
            onSelectTicket: handleTicketSelect,
            onAssignTicket: openAssignForm,
            onReassignTicket: openReassignForm,
            onSendForRetest: openRetestForm,
            onCloseTicket: openCloseForm,
          }}
          domLayout="normal"
          animateRows={true}
        />
      </div>
    </div>
  );
};

TicketTables.propTypes = {
  tickets: PropTypes.array.isRequired,
  onSelectTicket: PropTypes.func.isRequired,
  initialActiveTab: PropTypes.string,
};

export default TicketTables;
