interface SpinnerProps {
  label?: string;
  type?: string; // border | grow
}
export default function Spinner({
  label = "Loading",
  type = "border",
}: SpinnerProps) {
  return (
    // Bootstrap “spinners” can be used to show the loading state in your projects.
    <div className="d-flex flex-column align-items-center justify-content-center">
      <div className="row">
        {/* <div className="spinner-grow text-danger" role="status">
          <span className="visually-hidden">Loading...</span>
        </div> */}
        <div className={"spinner-" + type + " text-danger"} role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
      <div className="row">{label}</div>
    </div>
  );
}
