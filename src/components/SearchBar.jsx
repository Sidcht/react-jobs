import React from "react";

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="mb-6">
      <input
        type="text"
        placeholder="Search Jobs"
        className="w-full rounded-lg border border-gray 300 p-3 focus:border-indigo-500 focus: outline-none"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
