import "./FormComponents.css";

import {
  BsSearch,
  BsFillCaretDownFill,
  BsFillSquareFill,
  BsFillCircleFill,
  BsFillBookmarkFill,
  BsStarFill,
} from "react-icons/bs";
export function InputGroupWithIcon({ name, icon, register }) {
  return (
    <div className="input-group mb-3">
      <span className="input-group-text bg-transparent">{icon && icon}</span>

      <div className="form-floating">
        <input
          type="text"
          id={name}
          className="form-control border-start-0"
          placeholder="Username"
          // register component to react-hook-form
          {...register(name)}
        />
        <label htmlFor="username">Username</label>
      </div>
    </div>
  );
}

export function InputWithIcon({ name, icon, register }) {
  return (
    <div className="input-group mb-3">
      <span className="input-group-text bg-transparent">{icon && icon}</span>

      <input
        type="text"
        id={name}
        className="form-control border-start-0"
        placeholder={name}
        aria-label={name}
        // register component to react-hook-form
        {...register(name)}
      />
    </div>
  );
}

export function InputWithFloatingLabel({ name, register }) {
  return (
    <div className="form-floating">
      <input
        type="text"
        id={name}
        className="form-control"
        placeholder={name}
        aria-label={name}
        // register component to react-hook-form
        {...register(name)}
      />
      <label htmlFor={name}>{name}</label>
    </div>
  );
}

export function InputWithFloatingLabelAndButton({ name, button, register }) {
  return (
    <div className="input-group mb-3">
      <InputWithFloatingLabel name={name} register={register} />
      <span className="input-group-text bg-transparent">
        {button && button}
      </span>
    </div>
  );
}

export function ColorPicker({
  color = "red",
  colors = ["red", "orange", "yellow", "green", "blue", "purple"],
  onSelect,
}) {
  return (
    <div className="dropdown">
      <button
        className="btn dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <BsFillSquareFill color={color} size="1.5rem" />
      </button>
      <div className="dropdown-menu p-2">
        <div className="d-flex gap-2">
          {colors.map((color, index) => (
            <button
              key={color}
              id={color}
              className="btn"
              style={{
                width: "24px",
                height: "24px",
                borderRadius: "0.2rem",
                backgroundColor: color,
              }}
              onClick={onSelect}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ListItem({
  leadingIcon,
  title,
  subtitle,
  trailingIcon,
  onClick,
}) {
  return (
    <div
      className="result-line d-flex justify-content-between align-items-center p-2"
      // style={{ outline: "red 1px dashed" }}
      onClick={() => onClick(title)}
    >
      <div className="d-flex align-items-center gap-2">
        {/* leading icon */}
        {leadingIcon && leadingIcon}
        <div className="d-flex flex-column">
          <span>{title}</span>
          <div className="d-flex flex-row align-items-center time-text">
            {/* faded secondary text */}
            <span className="text-body-secondary">
              <small>{subtitle}</small>
            </span>
            {/* <span className="dots"></span>
            <span className="text-body-secondary">
              <small>Edited 15 minutes ago</small>
            </span> */}
          </div>
        </div>
      </div>
      {/* trailing text / icon */}
      {trailingIcon && trailingIcon}
      {/* <span className="content-text-1">BA</span> */}
    </div>
  );
}
