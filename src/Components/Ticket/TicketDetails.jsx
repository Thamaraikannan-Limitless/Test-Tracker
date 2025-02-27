import PropTypes from "prop-types";
import { LuArrowLeft } from "react-icons/lu";
import { IoMdCheckmark } from "react-icons/io";

const TicketDetails = ({ ticket, onBack }) => {
  const progressStages = [
    { label: "CREATED BY", user: ticket.reportedByName ? { name: ticket.reportedByName, date: ticket.reportedOn } : null },
    { label: "ASSIGNED BY", user: ticket.assignedToName ? { name: ticket.assignedToName, date: ticket.assignedDate } : null },
    { label: "ASSIGNED TO", user: ticket.assignedToName ? { name: ticket.assignedToName, date: ticket.assignedDate } : null },
    { label: "RETESTED BY", user: ticket.reTestByName ? { name: ticket.reTestByName, date: ticket.reTestDate } : null },
  ];
  return (
    <section>
    <div className="p-2">
      <div className="relative">
        {/* Ticket Header */}
        <h2 className="text-2xl  font-semibold mb-2 inline">
          {" "}
          {/* Back Button */}
          <button
            onClick={onBack}
            className="mb-4 px-4 mt-1 text-gray-600 cursor-pointer rounded"
          >
            <LuArrowLeft />
          </button>
            {ticket.ticketNumber}
           
            
       </h2>
       <span
          className={`px-3 ml-6 py-2 text-sm font-medium  rounded-md ${
            ticket.status === "Created"
              ? "bg-[#ECBF50] text-white"
              : ticket.status === "Assigned"
              ? "bg-[#E5927A] text-white"
              : ticket.status === "Done"
              ? "bg-[#00C875] text-white"
                : ticket.status === "ForRetest"
                  ? "bg-[#FF0000] text-white"
                   : ticket.status === "NotDone"
              ?  "bg-[#6141AC] text-white"
               :"bg-amber-800"
          }`}
        >
          {ticket.status}
        </span>
        
        <p className="text-black text-sm px-14 py-4 font-[600]">
        {console.log(ticket.ticketNumber)}
          Project: <span className="font-light">{ticket.projectName}</span>
        </p>
      </div>
      {/* Responsive Content Container */}
      <div className="flex flex-col lg:flex-row gap-8 mt-6">
        {/* Progress Section */}
        <div className="relative lg:w-[450px] h-[500px] bg-gray-100  rounded-xl">
          {progressStages.map((stage, index) => (
            <div
              key={index}
              className="relative flex gap-0 items-start  mt-12 "
            >
              {/* Circle Indicator */}
              <div className="relative z-10 px-4 ml-4 md:ml-[37%] lg:ml-12">
                {stage.user ? (
                  <div className="w-7 h-7  rounded-full bg-green-500 flex items-center justify-center">
                    <IoMdCheckmark className="text-white text-2xl" />
                  </div>
                ) : (
                  <div className="w-7 h-7  rounded-full bg-gray-300"></div>
                )}
                {/* Vertical Line */}
                {/* Line Indicator */}
                {index < progressStages.length - 1 && (
                  <div
                    className={`absolute top-6 left-[30px] md:left-[48%] lg:left-[28px] h-[110px] w-[2px] ${
                      progressStages[index + 1].user
                        ? "bg-green-500"
                        : "bg-gray-400"
                    }`}
                  ></div>
                )}
              </div>

              {/* Stage Details */}
              <div className="px-2 w-full h-[68px] ">
                <p className="font-semibold  text-[#9F9F9F] text-[10px] pb-1">
                  {stage.label}
                </p>
                {stage.user ? (
                  <div className="flex mt-1 gap-2">
                    {
                      <img
                        src={stage.user.image}
                        alt="User"
                        className="w-9 h-9 rounded-full mr-2  "
                      />
                    }
                    <div className="w-full">
                      <p className="font-medium text-sm">
                        {stage.user.name || stage.user}
                      </p>
                      {
                        <div className="w-full">
                          <p className="text-xs text-gray-500">
                          on {stage.user.date}
                        </p>
                        </div>
                        
                      }
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-400">-</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Ticket Details */}
        <div className="flex-1 bg-white   rounded-xl text-sm">
          <h3 className="font-semibold  mb-2">Ticket Details</h3>
          <p className="text-black">{ticket.bugDescription}</p>

          {/* Attachments */}
          {ticket.attachments && (
            <div className="mt-6">
              <h4 className="font-semibold text-sm">
                Attachments
                ({ticket.attachments.length})
              </h4>
              <div className="flex flex-wrap gap-2">
                {ticket.attachments.map((attachment, index) => (
                  <img
                    key={index}
                    src={attachment.url}
                    alt={`Attachment ${index + 1}`}
                    className="mt-2 w-24 h-24 object-cover rounded-lg"
                  />
                ))}
              </div>
            </div>
          )}

          {/* Remarks */}
          {ticket.remarks?.length > 0 && (
            <div className="mt-10">
              <h4 className="font-semibold">
                {" "}
                <span>{ticket.remarks.length}</span> Remarks
              </h4>
              {ticket.remarks.map((remark, i) => (
                <div
                  key={i}
                  className="mt-4 flex flex-row items-center mb-10 rounded-lg"
                >
                  <div className="flex items-center gap-4 flex-row  mb-4 py-3">
                    <img
                      src={remark.author.image}
                      alt="User"
                      className="w-9 h-9 max-w-9 rounded-full object-cover"
                    />
                    <div className="mt-0  lg:ml-0 text-left w-[100px]">
                      <p className="text-sm font-semibold">
                        {remark.author?.name}
                      </p>
                      <p className="text-xs  text-gray-500 ">
                        on {remark.date}
                      </p>
                    </div>
                  </div>
                  <p className="text-black text-left">{remark.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      </div>
      </section>
  );
};

TicketDetails.propTypes = {
  ticket: PropTypes.shape({
    ticketNumber: PropTypes.string.isRequired,
    projectName: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    reportedByName: PropTypes.string,
    reportedOn: PropTypes.string,
    assignedToName: PropTypes.string,
    assignedDate: PropTypes.string,
    reTestByName: PropTypes.string,
    reTestDate: PropTypes.string,
    bugDescription: PropTypes.string.isRequired,
    attachments: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string.isRequired,
      })
    ),
    remarks: PropTypes.arrayOf(
      PropTypes.shape({
        author: PropTypes.shape({
          name: PropTypes.string,
          image: PropTypes.string,
        }),
        text: PropTypes.string,
        date: PropTypes.string,
      })
    ),
  }).isRequired,
  onBack: PropTypes.func.isRequired,
};

export default TicketDetails;