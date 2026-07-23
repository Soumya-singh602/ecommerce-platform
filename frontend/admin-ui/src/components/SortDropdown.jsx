import React from "react";

function SortDropdown({ setSort }) {

  const handleChange = (e) => {
    setSort(e.target.value);
  };

  return (
    <select onChange={handleChange}>
      <option value="">
        Sort By
      </option>

      <option value="price">
        Price Low to High
      </option>

      <option value="-price">
        Price High to Low
      </option>

    </select>
  );
}

export default SortDropdown;