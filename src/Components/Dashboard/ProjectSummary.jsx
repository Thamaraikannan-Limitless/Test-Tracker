import PropTypes from "prop-types";

const ProjectSummary = ({ projects }) => {
  return (
    <div className="p-6 bg-[#F5F5F5]  rounded-tl-[60px] rounded-br-[60px]">
      <h2 className="text-[14px] font-[600] text-black mb-4">
        Summary of Ticket<span className="font-[400]">(Last 30 days)</span>
      </h2>

      {/* Titles Row */}
      <div className="grid grid-cols-4 gap-4 bg-gray-100 md:p-4 p-2 rounded-t-xl  text-[10px] font-[400] text-black">
        <span>Project Name</span>
        <span className="text-center">Created</span>
        <span className="text-center">Assigned</span>
        <span className="text-center">Completed</span>
      </div>

      {/* Project Data Rows */}
      <div className="space-y-2">
        {projects.map((project, index) => (
          <div
            key={index}
            className="grid grid-cols-4  gap-4 mb-4  text-[12px] bg-white  p-3 rounded-xl shadow-sm hover:bg-gray-100"
          >
            <span className="font-medium text-black">{project.name}</span>
            <span className="text-center text-black">{project.created}</span>
            <span className="text-center text-black">{project.assigned}</span>
            <span className="text-center text-black">{project.completed}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

ProjectSummary.propTypes = {
  projects: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      created: PropTypes.number.isRequired,
      assigned: PropTypes.number.isRequired,
      completed: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default ProjectSummary;
