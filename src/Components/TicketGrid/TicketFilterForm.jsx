import { useState, useEffect } from "react";
import PropType from "prop-types";
import api from "../../API/AxiosInterceptor";

const TicketFilterForm = ({ onClose, onApplyFilters, currentFilters }) => {
  const [isVisible, setIsVisible] = useState(false);

  // Initialize with current filters if available, otherwise use empty values
  const [filters, setFilters] = useState({
    project: currentFilters?.project || "",
    priority: currentFilters?.priority || "",
    status: currentFilters?.status || "",
    developer: currentFilters?.developer || "",
    tester: currentFilters?.tester || "",
  });

  const [projects, setProjects] = useState([]);
  const [developers, setDevelopers] = useState([]);
  const [testers, setTesters] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsVisible(true);

    // Fetch all required data from APIs
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch projects
        const projectResponse = await api.post("/Project/list", {});
        console.log("Project API Response:", projectResponse.data);

        if (projectResponse.data && projectResponse.data.model) {
          setProjects(projectResponse.data.model);
        } else {
          console.error(
            "Unexpected project data format:",
            projectResponse.data
          );
          setProjects([]);
        }

        // Fetch all developers/users
        const userResponse = await api.post("/Developer/list", {});
        console.log("Developer API Response:", userResponse.data);

        if (userResponse.data && userResponse.data.model) {
          // Filter developers
          const devs = userResponse.data.model.filter(
            (user) => user.department === "Developer"
          );
          setDevelopers(devs);

          // Filter testers
          const testers = userResponse.data.model.filter(
            (user) => user.department === "Tester"
          );
          setTesters(testers);
        } else {
          console.error("Unexpected developer data format:", userResponse.data);
          setDevelopers([]);
          setTesters([]);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  const handleBackgroundClick = (e) => {
    if (e.target.id === "overlay") {
      handleClose();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });

    if (value) {
      setError(false);
    }
  };

  const handleApplyFilters = () => {
    const activeFilters = Object.fromEntries(
      Object.entries(filters).filter(([_, value]) => value !== "")
    );

    if (Object.keys(activeFilters).length === 0) {
      setError(true);
      return;
    }

    onApplyFilters(activeFilters);
    handleClose();
  };

  return (
    <div
      id="overlay"
      className="form-overlay z-50 flex justify-end transition-opacity duration-300"
      onClick={handleBackgroundClick}
    >
      <div
        className={`bg-[#EDEDED] w-[400px] h-screen top-[56px] md:top-[72px] absolute overflow-y-auto shadow-lg transform transition-transform duration-300 ${
          isVisible ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-5">Filter Tickets</h2>

          {error && (
            <p className="text-red-500 text-sm mb-3">
              Please select at least one filter.
            </p>
          )}

          {isLoading ? (
            <p className="text-gray-500 text-sm mb-3">
              Loading filter options...
            </p>
          ) : (
            <>
              <label className="block mb-2 text-sm font-normal">Project</label>
              <select
                name="project"
                value={filters.project}
                onChange={handleChange}
                className="border border-gray-400 bg-white w-full p-2 text-xs font-normal rounded-md mb-5"
              >
                <option value="">Select Project</option>
                {projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.projectName}
                  </option>
                ))}
              </select>

              <label className="block mb-2 text-sm font-normal">Priority</label>
              <div className="flex space-x-4 mb-5">
                {["High", "Medium", "Low"].map((level) => (
                  <label
                    key={level}
                    className="flex items-center text-xs font-normal"
                  >
                    <input
                      type="radio"
                      name="priority"
                      value={level}
                      onChange={handleChange}
                      checked={filters.priority === level}
                      className="mr-2 bg-white"
                    />
                    {level}
                  </label>
                ))}
              </div>

              <label className="block mb-2 text-sm font-normal">Status</label>
              <select
                name="status"
                value={filters.status}
                onChange={handleChange}
                className="border border-gray-400 bg-white w-full p-2 rounded-md mb-5 text-xs font-normal"
              >
                <option value="">Select Status</option>
                <option value="Created">Created</option>
                <option value="Assigned">Assigned</option>
                <option value="InProgress">In Progress</option>
                <option value="Done">Done</option>
                <option value="ForRetest">For Retest</option>
              </select>

              <label className="block mb-2 text-sm font-normal">
                Developer
              </label>
              <select
                name="developer"
                value={filters.developer}
                onChange={handleChange}
                className="border border-gray-400 bg-white w-full p-2 rounded-md mb-5 text-xs font-normal"
              >
                <option value="">Select Developer</option>
                {developers.map((dev) => (
                  <option key={dev.id} value={dev.id}>
                    {dev.name}
                  </option>
                ))}
              </select>

              <label className="block mb-2 text-sm font-normal">Tester</label>
              <select
                name="tester"
                value={filters.tester}
                onChange={handleChange}
                className="border border-gray-400 bg-white w-full p-2 rounded-md mb-5 text-xs font-normal"
              >
                <option value="">Select Tester</option>
                {testers.map((tester) => (
                  <option key={tester.id} value={tester.id}>
                    {tester.name}
                  </option>
                ))}
              </select>
            </>
          )}

          <div className="flex justify-end gap-x-8 mt-8 mb-[50px] md:mb-0">
            <button
              onClick={handleClose}
              className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleApplyFilters}
              disabled={isLoading}
              className={`${
                isLoading ? "bg-gray-500" : "bg-[#034C41] hover:bg-[#026f63]"
              } text-white px-4 py-2 rounded-md transition`}
            >
              Apply filter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

TicketFilterForm.propTypes = {
  onClose: PropType.func.isRequired,
  onApplyFilters: PropType.func.isRequired,
  currentFilters: PropType.object, // New prop to receive current filters
};

export default TicketFilterForm;
