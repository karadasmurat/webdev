import { ChangeEvent, useState } from "react";

type SelectFilterProps = {
  label: string;
  options: string[];
  initialOption: string;
  onChange: (category: string) => void;
};

export default function SelectFilter({
  label,
  options,
  initialOption,
  onChange,
}: SelectFilterProps) {
  const [selectedOption, setSelectedOption] = useState(initialOption);

  function handleChange(event: ChangeEvent<HTMLSelectElement>) {
    const selectedOption = event.target.value;
    setSelectedOption(selectedOption);
    onChange(selectedOption);
  }

  return (
    <div className="row align-items-center mb-3">
      <div className="col-auto ms-auto">
        <label htmlFor="category">{label}</label>
      </div>
      <div className="col-auto">
        <select
          id="category"
          value={selectedOption}
          onChange={handleChange}
          className="form-select"
        >
          <option value="All">All</option>
          {options.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
