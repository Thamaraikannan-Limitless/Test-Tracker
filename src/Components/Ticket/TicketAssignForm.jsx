import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import useProjectDeveloperStore from "../../Store/DropDownStore";
import useAssignFormStore from "../../Store/AssignFormStore";

const TicketAssignForm = ({ ticket, onClose }) => {
  const [formData, setFormData] = useState({
    developer: "",
    addremarks: "",
  });

  const { developers, fetchDevelopers } = useProjectDeveloperStore();
  const { assignTicket } = useAssignFormStore(); // Use the assignTicket function from the store

  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchDevelopers(); // Fetch developers data on component mount
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    if (!formData.developer) newErrors.developer = "Please select a developer.";
    if (!formData.addremarks)
      newErrors.addremarks = "Bug details are required.";
    return newErrors;
  };

  // Handle form submission
  const handleSubmit = async () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      // Prepare the payload for the API
      const payload = {
        ticketId: ticket.id, // Use the ticketId from the selected ticket
        assignedTo: formData.developer, // Assuming formData.developer contains the developer ID
        remarksDeveloper: formData.addremarks, // Remarks from the form
      };

      // Call the assignTicket function from the store
      await assignTicket(payload);

      // Close the form after successful submission
      onClose();
    } catch (error) {
      console.error("Error assigning ticket:", error);
    }
  };

  return (
    <div className="p-6 max-h-[90vh] overflow-y-auto">
      <h2 className="text-2xl font-semibold mb-5">Assign to</h2>
      <div className="w-full bg-[#c2c3c3] text-left mb-6 ">
        <h1 className="pt-3 pl-3 text-sm font-[600]">
          Ticket Number :<span className="font-[400] pl-1">{ticket.ticket}</span>
        </h1>
        <h1 className="pt-3 pl-3 pb-3 text-sm font-[600]">
          Project Name :<span className="font-[400] pl-1">{ticket.project}</span>
        </h1>
      </div>

      {/* Developer Selection */}
      <label className="block mb-2 text-sm font-[400] ">
        Developer <span className="text-red-600">*</span>
      </label>
      <select
        name="developer"
        value={formData.developer}
        onChange={handleChange}
        className={`" border border-gray-400 w-full p-2  rounded-md ${
          errors.developer ? " mb-1 " : " mb-5 "
        }"`}
      >
        <option value="">Select Developer</option>
        {developers.map((dev) => (
          <option key={dev.id} value={dev.id}>
            {dev.name}
          </option>
        ))}
      </select>
      {errors.developer && (
        <p className="text-red-500 text-sm mb-2">{errors.developer}</p>
      )}

      {/* Add Remarks */}
      <label className="block mb-2 text-sm font-[400] ">Add Remark</label>
      <textarea
        name="addremarks"
        value={formData.addremarks}
        onChange={handleChange}
        className={`" border border-gray-400 w-full p-2  rounded-md ${
          errors.addremark ? " mb-5 " : " mb-0 "
        }"`}
        placeholder="Describe the bug..."
        rows="3"
      ></textarea>
      {errors.addremarks && (
        <p className="text-red-500 text-sm mb-2">{errors.addremarks}</p>
      )}

      {/* Action Buttons */}
      <div className="flex justify-end gap-x-8 mt-4 mb-7">
        <button
          onClick={onClose}
          className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500 transition"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="bg-[#034C41] text-white px-4 py-2 rounded-md hover:bg-[#026f63] transition"
        >
          Save
        </button>
      </div>
    </div>
  );
};

TicketAssignForm.propTypes = {
  ticket: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default TicketAssignForm;