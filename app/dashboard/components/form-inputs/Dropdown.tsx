import React, { ChangeEvent } from 'react';

interface SelectProps {
  options: string[] | null; // List of possible strings as values for options
  onChange: (selectedValue: string) => void; // Callback function when the selected value changes
}

// This input is a dropdown form element which will take an array of strings and a setState function and will allow users t
// modify change the data source for the charts they are looking at. The options prop is an array of strings which will 
// will need to correspond exactly to values in the data 
// i.e. ["Sport", "Trad"] for the "Route Type" column, ["Onsight", "Flash", "Redpoint", "(etc..)"] for the "Lead Style" column) 

const Dropdown: React.FC<SelectProps> = ({ options, onChange }) => {
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    onChange(selectedValue);
  };

  if (!options) return null;
  return (
    <select onChange={handleChange} defaultValue={options[0]}>
      {options && options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;