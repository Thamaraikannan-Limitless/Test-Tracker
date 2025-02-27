import { useState } from "react";
import PropTypes from "prop-types";

const ColumnSelector = ({ allColumns, hiddenColumns, setHiddenColumns }) => {
  const [selectAllColumns, setSelectAllColumns] = useState(
    hiddenColumns.length === 0
  );

  const handleColumnToggle = (field) => {
    setHiddenColumns((prev) => {
      let updatedColumns;

      if (prev.includes(field)) {
        updatedColumns = prev.filter((col) => col !== field);
      } else {
        updatedColumns = [...prev, field];
      }

      setSelectAllColumns(updatedColumns.length === 0);
      return updatedColumns;
    });
  };

  const handleSelectAllToggle = () => {
    if (!selectAllColumns) {
      setHiddenColumns([]);
      setSelectAllColumns(true);
    }
  };

  // Remove the last column from the displayed list
  const displayedColumns = allColumns.slice(0, -1);

  return (
    <div className="absolute right-0 bg-white border-gray-300 mt-1 rounded shadow-md z-10">
      <label className="flex items-center px-2 w-44 py-1.5 text-[12px] font-medium border-b border-gray-100 hover:bg-gray-100">
        <input
          type="checkbox"
          checked={selectAllColumns}
          onChange={handleSelectAllToggle}
          className="mr-2"
        />
        All
      </label>
      {displayedColumns.map((col) => (
        <label
          key={col.field}
          className="flex items-center px-2 w-44 py-1.5 text-[12px] font-light lowercase border-b border-gray-100 hover:bg-gray-100"
        >
          <input
            type="checkbox"
            checked={!hiddenColumns.includes(col.field)}
            onChange={() => handleColumnToggle(col.field)}
            className="mr-2"
          />
          {col.headerName}
        </label>
      ))}
    </div>
  );
};

ColumnSelector.propTypes = {
  allColumns: PropTypes.array.isRequired,
  hiddenColumns: PropTypes.array.isRequired,
  setHiddenColumns: PropTypes.func.isRequired,
};

export default ColumnSelector;
