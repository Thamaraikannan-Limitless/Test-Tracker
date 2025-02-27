import { useState, useRef, useEffect } from "react";
import { FiSearch, FiFilter } from "react-icons/fi";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import PropTypes from "prop-types";
import TicketFilterForm from "./TicketFilterForm";
import ColumnSelector from "./ColumnSelector";
import AppliedFiltersDisplay from "./AppliedFiltersDisplay";
import { TbColumns2 } from "react-icons/tb";

const TableFilters = ({
  searchQuery,
  setSearchQuery,
  appliedFilters,
  clearFilter,
  clearAllFilters,
  onApplyFilters,
  allColumns,
  hiddenColumns,
  setHiddenColumns,
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <div className="flex flex-wrap text-[14px] gap-4 mb-2 pt-2 items-center">
      <AppliedFiltersDisplay
        appliedFilters={appliedFilters}
        clearFilter={clearFilter}
        clearAllFilters={clearAllFilters}
      />

      <div className="flex items-center border border-[#9F9F9F] rounded-xl px-2 py-1 ml-auto w-40">
        <FiSearch className="mr-2 text-[#9F9F9F]" />
        <input
          type="text"
          placeholder="Search"
          className="outline-none w-full"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div>
        <Tippy content="Filters" placement="top" arrow={true}>
          <div className="flex justify-end">
            <FiFilter
              size={24}
              className="cursor-pointer font-light"
              onClick={() => setIsFilterOpen(true)}
            />
          </div>
        </Tippy>

        {isFilterOpen && (
          <div className="absolute top-[20px]">
            <TicketFilterForm
              onClose={() => setIsFilterOpen(false)}
              onApplyFilters={onApplyFilters}
              currentFilters={appliedFilters} // Pass current filters to form
            />
          </div>
        )}
      </div>

      <div className="relative" ref={dropdownRef}>
        <Tippy content="Toggle Column" placement="top" arrow={true}>
          <div className="flex justify-end">
            <TbColumns2
              size={24}
              className="cursor-pointer"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            />
          </div>
        </Tippy>

        {dropdownOpen && (
          <ColumnSelector
            allColumns={allColumns}
            hiddenColumns={hiddenColumns}
            setHiddenColumns={setHiddenColumns}
          />
        )}
      </div>
    </div>
  );
};

TableFilters.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  setSearchQuery: PropTypes.func.isRequired,
  appliedFilters: PropTypes.object.isRequired,
  clearFilter: PropTypes.func.isRequired,
  clearAllFilters: PropTypes.func.isRequired,
  onApplyFilters: PropTypes.func.isRequired,
  allColumns: PropTypes.array.isRequired,
  hiddenColumns: PropTypes.array.isRequired,
  setHiddenColumns: PropTypes.func.isRequired,
};

export default TableFilters;
