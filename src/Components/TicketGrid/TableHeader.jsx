import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const TableHeader = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: "All", label: "All", route: "/ticket" },
    { id: "Created", label: "Created", route: "/ticket/created" },
    { id: "Assigned", label: "Assigned", route: "/ticket/assigned" },
    { id: "Completed", label: "Completed", route: "/ticket/completed" },
  ];

  return (
    <div className="flex space-x-8 flex-wrap border-b-[0px] text-[16px] font-semibold border-[#EDEDED]">
      {tabs.map((tab) => (
        <Link
          key={tab.id}
          to={tab.route}
          className={`cursor-pointer ${
            activeTab === tab.id
              ? "border-b-2 border-black"
              : "hover:border-b-2 hover:border-gray-400"
          }`}
          onClick={(e) => {
            e.preventDefault(); // Prevent default navigation
            setActiveTab(tab.id); // Call the setActiveTab function from props
          }}
        >
          {tab.label}
        </Link>
      ))}
    </div>
  );
};

TableHeader.propTypes = {
  activeTab: PropTypes.string.isRequired,
  setActiveTab: PropTypes.func.isRequired,
};

export default TableHeader;
