// src/components/Table/ColumnDefinition.js
import StatusCellRenderer from "./Renderers/StatusCellRenderer";
import TicketLinkRenderer from "./Renderers/TicketLinkRenderer";
import UserProfileRenderer from "./Renderers/UserProfileRenderer";
import MoreOptionsRenderer from "./Renderers/MoreOptionsRenderer";
import EditTimeRenderer from "./Renderers/EditTimeRenderer";
import ChangeStatusRenderer from "./Renderers/ChangeStatusRenderer";
import DateFormatter from "./Utils/DateFormatter";

export const getCreatedTabColumns = (onSelectTicket, openAssignForm) => [
  {
    headerName: "TICKET #",
    field: "ticket",
    cellRenderer: TicketLinkRenderer,
    cellRendererParams: { onSelectTicket },
    sortable: true,
    sort: "asc",
    filter: false,
    flex: 1,
    minWidth: 100,
    pinned: "left",
  },
  {
    headerName: "PROJECT",
    field: "project",
    sortable: true,
    sort: "asc",
    filter: false,
    flex: 1,
    minWidth: 200,
  },

  {
    headerName: "CREATED ON",
    field: "createdOn",
    sortable: true,
    sort: "asc",
    filter: false,
    flex: 1,
    minWidth: 200,
    valueFormatter: (params) => DateFormatter(params.value),
  },
  {
    headerName: "CREATED BY",
    field: "createdBy.name",
    cellRenderer: UserProfileRenderer,
    flex: 1,
    minWidth: 200,
  },
  {
    headerName: "REPORTED BY",
    field: "reportedBy.name",
    cellRenderer: UserProfileRenderer,
    flex: 1,
    minWidth: 200,
  },
  {
    headerName: "",
    field: "MoreOptionsCreatedRenderer",
    cellRenderer: MoreOptionsRenderer,
    cellRendererParams: {
      context: {
        onSelectTicket,
        onAssignTicket: openAssignForm, // Pass the openAssignForm function
      },
    },
    flex: 1,
    width: 10,
    pinned: "right",
  },
];

export const getAssignedTabColumns = (
  onSelectTicket,
  openAverageTimeForm,
  openReassignForm,
  openRetestForm
) => [
  {
    headerName: "TICKET #",
    field: "ticket",
    cellRenderer: TicketLinkRenderer,
    cellRendererParams: { onSelectTicket },
    sortable: true,
    sort: "asc",
    filter: false,
    flex: 1,
    minWidth: 150,
    pinned: "left",
  },
  {
    headerName: "PROJECT",
    field: "project",
    sortable: true,
    sort: "asc",
    filter: false,
    flex: 1,
    minWidth: 250,
  },
  {
    headerName: "ASSIGNED ON",
    field: "assignedOn",
    sortable: true,
    sort: "asc",
    filter: false,
    flex: 1,
    minWidth: 150,
    valueFormatter: (params) => DateFormatter(params.value),
  },
  {
    headerName: "ASSIGNED BY",
    field: "assignedBy.name",
    cellRenderer: UserProfileRenderer,
    flex: 1,
    minWidth: 150,
  },
  {
    headerName: "ASSIGNED TO",
    field: "assignedTo.name",
    cellRenderer: UserProfileRenderer,
    flex: 1,
    minWidth: 150,
  },
  {
    headerName: "AVERAGE TIME",
    field: "averageTime",
    sortable: true,
    sort: "asc",
    cellRenderer: EditTimeRenderer,
    cellRendererParams: { onClick: openAverageTimeForm }, // Pass the onClick handler
    flex: 1,
    minWidth: 150,
  },
  {
    headerName: "",
    field: "moreOptions",
    cellRenderer: MoreOptionsRenderer,
    cellRendererParams: {
      context: {
        onSelectTicket,
        onReassignTicket: openReassignForm,
        onSendForRetest: openRetestForm,
      },
    },
    width: 10,
    pinned: "right",
  },
];

export const getCompletedTabColumns = (onSelectTicket, openCloseForm) => [
  {
    headerName: "TICKET #",
    field: "ticket",
    cellRenderer: TicketLinkRenderer,
    cellRendererParams: { onSelectTicket },
    sortable: true,
    sort: "asc",
    filter: false,
    flex: 1,
    minWidth: 120,
    pinned: "left",
  },
  {
    headerName: "PROJECT",
    field: "project",
    sortable: true,
    sort: "asc",
    filter: false,
    flex: 1,
    minWidth: 120,
  },
  {
    headerName: "COMPLETED BY",
    field: "completedBy.name",
    sortable: false,
    cellRenderer: UserProfileRenderer,
    flex: 1,
    minWidth: 150,
  },
  {
    headerName: "COMPLETED ON",
    field: "completedOn",
    sortable: true,
    sort: "asc",
    filter: false,
    flex: 1,
    minWidth: 150,
    valueFormatter: (params) => DateFormatter(params.value),
  },
  {
    headerName: "RETEST TO",
    field: "retestTo.name",
    cellRenderer: UserProfileRenderer,
    flex: 1,
    minWidth: 150,
  },
  {
    headerName: "TIME TO FINISH",
    field: "timeToFinish",
    sortable: true,
    sort: "asc",
    filter: false,
    flex: 1,
    minWidth: 150,
  },
  {
    headerName: "CHANGE STATUS",
    field: "changeStatus",
    cellRenderer: ChangeStatusRenderer,
    flex: 1,
    minWidth: 150,
  },
  {
    headerName: "",
    field: "moreOptions",
    cellRenderer: MoreOptionsRenderer,
    cellRendererParams: {
      context: { onSelectTicket, onCloseTicket: openCloseForm },
    },
    width: 10,
    pinned: "right",
  },
];

export const getDefaultColumns = (
  onSelectTicket,
  openAssignForm,
  openReassignForm,
  openRetestForm,
  openCloseForm
) => [
  {
    headerName: "TICKET #",
    field: "ticket",
    cellRenderer: TicketLinkRenderer,
    cellRendererParams: { onSelectTicket },
    sortable: true,
    sort: "asc",
    filter: false,
    minWidth: 150,
    pinned: "left",
  },
  {
    headerName: "PROJECT",
    field: "project",
    sortable: false,
    filter: false,
    flex: 1,
    minWidth: 150,
  },
  {
    headerName: "CREATED ON",
    field: "createdOn",
    sortable: true,
    sort: "asc",
    filter: false,
    flex: 1,
    minWidth: 150,
    valueFormatter: (params) => DateFormatter(params.value),
  },
  {
    headerName: "ASSIGNED ON",
    field: "assignedOn",
    sortable: true,
    sort: "asc",
    filter: false,
    flex: 1,
    minWidth: 150,
    valueFormatter: (params) => DateFormatter(params.value),
  },
  {
    headerName: "COMPLETED ON",
    field: "completedOn",
    sortable: true,
    sort: "asc",
    filter: false,
    flex: 1,
    minWidth: 150,
    valueFormatter: (params) => DateFormatter(params.value),
  },
  {
    headerName: "STATUS",
    field: "status",
    cellRenderer: StatusCellRenderer,
    flex: 1,
    minWidth: 150,
  },
  {
    headerName: "TIME TO ALLOCATE",
    field: "timeToAllocate",
    minWidth: 150,
    flex: 1,
    sortable: true,
    sort: "asc",
  },
  {
    headerName: "TIME TO FINISH",
    field: "timeToFinish",
    sortable: true,
    sort: "asc",
    minWidth: 150,
    flex: 1,
  },
  {
    headerName: "",
    field: "moreOptions",
    cellRenderer: MoreOptionsRenderer,
    cellRendererParams: {
      context: {
        onSelectTicket,
        onAssignTicket: openAssignForm,
        onReassignTicket: openReassignForm,
        onSendForRetest: openRetestForm,
        onCloseTicket: openCloseForm,
      },
    },
    width: 10,
    pinned: "right",
  },
];
