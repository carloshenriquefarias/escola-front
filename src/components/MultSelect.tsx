import React from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

interface StudentOption {
  value: string;
  label: string;
}

interface MultiSelectComponentProps {
  selectedOptions: StudentOption[];
  onChange: (newOptions: StudentOption[]) => void;
}

const MultiSelectComponent: React.FC<MultiSelectComponentProps> = ({ selectedOptions, onChange }) => {
  const animatedComponents = makeAnimated();

  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      cursor: 'default',
    }),
    multiValue: (provided: any) => ({
      ...provided,
      backgroundColor: '#E2E8F0',
    }),
  };

  return (
    <Select 
      value={selectedOptions}
      components={animatedComponents}
      isMulti
      styles={customStyles}
      onChange={(newValue) => onChange(newValue as StudentOption[])}
      isClearable={true}
      isSearchable={false}
      closeMenuOnSelect={false}
      menuIsOpen={false}
    />
  );
};

export default MultiSelectComponent;


