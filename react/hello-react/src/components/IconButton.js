export default function IconButton({
  icon,
  text,
  colorClass = "primary",
  onClick,
}) {
  return (
    <button onClick={onClick} className={"btn btn-" + colorClass}>
      <span className="d-flex justify-content-center align-items-center">
        {icon}
        &nbsp; {text && text}
      </span>
    </button>
  );
}
