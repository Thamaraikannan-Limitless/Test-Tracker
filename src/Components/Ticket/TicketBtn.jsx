import { useState, useEffect, useRef } from "react";
import TicketForm from "./TicketForm";

// import RemarkForm from "./RemarkForm";
const TicketBtn = () => {
  const [showForm, setShowForm] = useState(false);
  // const [remarkForm, setRemarkForm] = useState(false);
  const formRef = useRef(null);


  // Close form when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setShowForm(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="py-3 relative">

      {/* Header Section */}
      <section>
        <header className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Tickets</h1>
          <div className="flex items-center gap-4">
            {" "}
            {/* Updated: Added gap for spacing */}
            {/* New Ticket Button */}
            <button
              onClick={() => setShowForm(true)}
              className="bg-[#034C41] text-white cursor-pointer font-bold text-sm px-4 py-2 h-[37px] w-[125px] rounded-full hover:bg-[#026f63] transition"
            >
              New Ticket
            </button>
            {/* Remark Button */}
            {/* <button
              onClick={() => setRemarkForm(true)}
              className="bg-[#034C41] text-white px-4 py-2 rounded-full h-[37px] w-[125px] hover:bg-[#026f63] transition"
            >
              Remark Form
            </button> */}
          </div>
        </header>
      </section>

      {/* Overlay Background */}
      {showForm && (
        <div
          className="fixed inset-0 bg-[#00000080] bg-opacity-50 z-10"
          onClick={() => setShowForm(false)} // Close form when clicking overlay
        ></div>
      )}

      {/* Form Section - Render conditionally */}
      <div
        ref={formRef}
        className={`fixed md:top-[72px] top-[56px] right-0 h-full max-h-screen md:w-[480px] bg-[#EDEDED] z-50 w-[380px] shadow-md transform ${
          showForm ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-500 ease-in-out overflow-y-auto`}
      >
        {showForm && <TicketForm onClose={() => setShowForm(false)} />}
      </div>
      {/* Remark Form (Opens on click, Closes on clicking outside) */}
      {/* {remarkForm && (
        <div
          className="fixed inset-0 bg-[#00000080] bg-opacity-50 z-10 "
          onClick={() => setRemarkForm(false)} // Close form when clicking overlay
        ></div>
      )}
      <div
        ref={remarkRef}
        className={`fixed md:top-[72px] top-[56px] right-0 h-full max-h-screen md:w-[480px] bg-[#EDEDED] z-20 w-[380px] shadow-md transform ${
          remarkForm ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-500 ease-in-out overflow-y-auto`}
      >
        {remarkForm && <RemarkForm onClose={() => setRemarkForm(false)} />}
      </div> */}
    </div>
  );
};

export default TicketBtn;
