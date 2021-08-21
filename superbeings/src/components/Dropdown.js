import React from "react";

export const Dropdown = ({ heading, options, onSelect }) => {
  return (
    <div class="dropdown">
      <select
        onChange={(e) => {
          const optionValue = e.target.value;
          onSelect(optionValue);
        }}
        name={heading}
        id={heading}
      >
        {options.map((option) => (
          <option value={option}>{option}</option>
        ))}
      </select>
    </div>
  );
};
