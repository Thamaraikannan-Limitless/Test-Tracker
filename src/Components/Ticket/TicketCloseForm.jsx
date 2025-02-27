import { useState } from "react";
import PropTypes from "prop-types";


const TicketCloseForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    remarks: "",
    status: "",
  });

  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" })); // Clear errors on input
  };
 // Form validation
  const validateForm = () => {
    const newErrors = {};
    if (!formData.remarks) newErrors.remarks = "Bug details are required.";
    if (!formData.status) newErrors.status = "Please select a status.";

    return newErrors;
  };

  // Handle form submission
  const handleSubmit = () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    } 
    setTimeout(onClose, 1000); // Close the form after the toast is displayed
  };

  return (
    <>
      <div className="p-6 max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-semibold mb-5">Close Ticket</h2>

        <div className="w-full bg-[#c2c3c3] text-left mb-6 ">
          <h1 className="pt-3 pl-3 text-sm font-[600]">
            Ticket Number :<span className="font-[400] pl-1">TK00001</span>
          </h1>
          <h1 className="pt-3 pl-3 pb-3 text-sm font-[600]">
            Project Name :<span className="font-[400] pl-1">Project 1</span>
          </h1>
        </div>
        {/* Status Selection */}
        <div>
          <label className="block mb-2  text-sm font-[400] ">
            Status 
          </label>
          <div className="flex space-x-5 mb-2">
            {["Done", "Not Done"].map((level) => (
              <label key={level}>
                <input
                  type="radio"
                  name="status"
                  value={level}
                  onChange={handleChange}
                  className={`"mr-2 ${errors.status ? " mb-1 " : " mb-5 "}"`}
                  checked={formData.status === level}
                />
                <span className="ml-2 text-sm">{level}</span>  
              </label>
            ))}
          </div>
          {errors.status && (
            <p className="text-red-500 text-sm mb-2 ">{errors.status}</p>
          )}
        </div>

        {/* remarks Details */}
        <div>
          <label className="block mb-2 text-sm font-[400] ">
            Remarks
          </label>
          <textarea
            name="remarks"
            value={formData.remarks}
            onChange={handleChange}
            className={`" border border-gray-400 w-full p-2  rounded-md ${
              errors.remarks ? " mb-1 " : " mb-5 "
            }"`}
            placeholder="Describe the bug..."
            rows="8"
          ></textarea>
          {errors.remarks && (
            <p className="text-red-500 text-sm mb-2">{errors.remarks}</p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex  justify-end gap-x-8 mt-4 mb-7">
          <button
            onClick={onClose}
            className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500 transition"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              handleSubmit();
            }}
            className="bg-[#034C41] text-white px-4 py-2 rounded-md hover:bg-[#026f63] transition"
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
};

TicketCloseForm.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default TicketCloseForm;
