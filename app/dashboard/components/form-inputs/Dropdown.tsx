import React, { ChangeEvent } from 'react';

interface SelectProps {
  options: string[] | null; // List of possible strings as values for options
  onChange: (selectedValue: string) => void; // Callback function when the selected value changes
}

const Dropdown: React.FC<SelectProps> = ({ options, onChange }) => {
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    onChange(selectedValue);
  };

  return (
    <select onChange={handleChange} defaultValue={"All"}>
      {options && options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;