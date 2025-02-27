import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { RxCrossCircled } from "react-icons/rx";

import useTicketStore from "../../Store/TicketStore";
import useProjectDeveloperStore from "../../Store/DropDownStore";

const TicketForm = ({ onClose }) => {
  const {
    formData,
    errors,
    setFormField,
    addScreenshots,
    deleteScreenshot,
    submitForm,
    resetForm,
  } = useTicketStore();

  const {
    projects,
    testers,
    fetchProjects,
    fetchTesters,
  } = useProjectDeveloperStore();
  const fileInputRef = useRef(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    // Set today's date as default for ticket date if not already set
    if (!formData.ticketDate) {
      setFormField('ticketDate', today);
    }

    fetchProjects();
    fetchTesters();
  }, []);

  // Handle file selection
  const handleScreenshotSelection = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      addScreenshots(files);
      console.log("Screenshots added:", files.map(f => f.name));
    }
  };

  // Trigger the file input on click
  const handleScreenshotClick = () => {
    fileInputRef.current.click();
  };

  // Delete an image
  const handleDeleteImage = (index) => {
    deleteScreenshot(index);
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormField(name, value);
  };

 

  // Handle form submission
  const handleSubmit = async () => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    try {
      const success = await submitForm();
      
      if (success) {
       
        setTimeout(() => {
          resetForm();
          onClose();
        }, 1000);
      } 
    } catch (error) {
      console.error("Error in form submission:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="p-6 max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-semibold mb-5">Create a New Ticket</h2>

        {/* Project Selection */}
        <label className="block mb-2 text-sm font-[400] ">
          Project <span className="text-red-600">*</span>
        </label>
        <select
          name="project"
          value={formData.project}
          onChange={handleChange}
          className={`border border-gray-400 w-full p-2 rounded-md ${
            errors.project ? "mb-1" : "mb-5"
          }`}
        >
          <option value="">Select Project</option>
          {projects.map((data) => (
            <option key={data.id} value={data.id}>
              {data.projectName}
            </option>
          ))}
        </select>
        {errors.project && (
          <p className="text-red-500 text-sm mb-2">{errors.project}</p>
        )}

        <div className="md:flex md:justify-between gap-x-15">
          {/* Ticket Number */}
          <div className="w-full md:w-1/2 md:mr-2">
            <label className="block mb-2 text-sm font-[400]">
              Ticket Number <span className="text-red-600">*</span>
            </label>
            <input
              name="ticketNumber"
              value={formData.ticketNumber}
              onChange={handleChange}
              className={`border border-gray-400 w-full p-2 rounded-md ${
                errors.ticketNumber ? "mb-1" : "mb-5"
              }`}
              placeholder="Enter Ticket Number"
            />
            {errors.ticketNumber && (
              <p className="text-red-500 text-sm mb-2">{errors.ticketNumber}</p>
            )}
          </div>

          {/* Ticket Date */}
          <div className="w-full md:w-1/2 md:ml-2">
            <label className="block mb-2 text-sm font-[400]" htmlFor="date">
              Ticket Date <span className="text-red-600">*</span>
            </label>
            <input
              type="date"
              name="ticketDate"
              id="date"
              value={formData.ticketDate || today}
              onChange={handleChange}
              className={`border border-gray-400 w-full p-2 rounded-md ${
                errors.ticketDate ? "mb-1" : "mb-5"
              }`}
            />
            {errors.ticketDate && (
              <p className="text-red-500 text-sm mb-2">{errors.ticketDate}</p>
            )}
          </div>
        </div>

        {/* Reported by */}
        <div className="w-full">
          <label className="block mb-2 text-sm font-[400]">
            Reported By <span className="text-red-600">*</span>
          </label>
          <select
            name="reportedBy"
            value={formData.reportedBy}
            onChange={handleChange}
            className={`border border-gray-400 w-full p-2 z-10 rounded-md ${
              errors.reportedBy ? "mb-1" : "mb-5"
            }`}
          >
            <option value="">Select Reported By</option>
            {testers.map((data) => (
              <option key={data.id} value={data.id}>
                {data.name}
              </option>
            ))}
          </select>
          {errors.reportedBy && (
            <p className="text-red-500 text-sm mb-2">{errors.reportedBy}</p>
          )}
        </div>

        {/* Reported Date - New Field */}
        <div className="w-full">
          <label className="block mb-2 text-sm font-[400]">
            Reported Date <span className="text-red-600">*</span>
          </label>
          <input
            type="date"
            name="reportedDate"
            value={formData.reportedDate || today}
            onChange={handleChange}
            className={`border border-gray-400 w-full p-2 rounded-md ${
              errors.reportedDate ? "mb-1" : "mb-5"
            }`}
          />
          {errors.reportedDate && (
            <p className="text-red-500 text-sm mb-2">{errors.reportedDate}</p>
          )}
        </div>

        {/* Bug Details */}
        <div>
          <label className="block mb-2 text-sm font-[400]">
            Bug Details <span className="text-red-600">*</span>
          </label>
          <textarea
            name="bugDetails"
            value={formData.bugDetails}
            onChange={handleChange}
            className={`border border-gray-400 w-full p-2 rounded-md ${
              errors.bugDetails ? "mb-1" : "mb-5"
            }`}
            placeholder="Describe the bug..."
            rows="3"
          ></textarea>
          {errors.bugDetails && (
            <p className="text-red-500 text-sm mb-2">{errors.bugDetails}</p>
          )}
        </div>

        {/* Priority Selection */}
        <div>
          <label className="block mb-2 text-sm font-[400]">
            Priority <span className="text-red-600">*</span>
          </label>
          <div className="flex space-x-5 mb-2">
            {["High", "Medium", "Low"].map((level) => (
              <label key={level} className="flex items-center">
                <input
                  type="radio"
                  name="priority"
                  value={level}
                  onChange={handleChange}
                  className="mr-2"
                  checked={formData.priority === level}
                />
                <span>{level}</span>
              </label>
            ))}
          </div>
          {errors.priority && (
            <p className="text-red-500 text-sm mb-2">{errors.priority}</p>
          )}
        </div>

        {/* Attach Screenshot Section */}
        <div
          onClick={handleScreenshotClick}
          className="w-2/3 p-2 border-2 border-[#034C41] rounded-lg mb-2 mt-2 cursor-pointer text-center"
        >
          <p className="text-[#034C41]">Attach Screenshots</p>
        </div>
        {errors.screenshots && (
          <p className="text-red-500 text-sm mb-2">{errors.screenshots}</p>
        )}

        {/* Image Previews with Delete Icons */}
        <div className="flex flex-wrap gap-2">
          {formData.screenshots.map((file, index) => (
            <div key={index} className="relative w-28 h-28 mb-2">
              <img
                src={URL.createObjectURL(file)}
                alt="Screenshot Preview"
                className="w-full h-full object-cover rounded-md"
              />
              <span
                onClick={() => handleDeleteImage(index)}
                className="absolute top-1 right-1 text-red-800 font-extrabold bg-red-400 rounded-full p-1 cursor-pointer"
              >
                <RxCrossCircled size={16} />
              </span>
            </div>
          ))}
        </div>

        {/* Hidden File Input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleScreenshotSelection}
          accept="image/*"
          multiple
          className="hidden"
        />

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
            disabled={isSubmitting}
            className={`${
              isSubmitting ? "bg-gray-500" : "bg-[#034C41] hover:bg-[#026f63]"
            } text-white px-4 py-2 rounded-md transition`}
          >
            {isSubmitting ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </>
  );
};

TicketForm.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default TicketForm;