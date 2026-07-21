import React from "react";

const SortDropDown = ({ sortBy, setSortBy }) => {
  return (
    <div className="mb-6 flex justify-end">
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="border rounded-lg px-4 py-2"
      >
        <option value="default">Sort By</option>
        <option value="title-asc">Job Title (A-Z)</option>
        <option value="title-desc">Job Title (Z-A)</option>
        <option value="company-asc">Company Name (A-Z)</option>
        <option value="company-desc">Company Name (Z-A)</option>
        <option value="location-asc">Location (A-Z)</option>
        <option value="location-desc">Location (Z-A)</option>
      </select>
    </div>
  );
};

export default SortDropDown;
