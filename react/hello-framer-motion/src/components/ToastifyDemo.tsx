import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ToastifyDemo() {
  const [type, setType] = useState("default");

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setType(event.target.value);
  };

  const notify = () => {
    if (type == "info") {
      toast.info("Wow so easy!");
    } else if (type == "success") {
      toast.success("Wow so easy!");
    }
  };

  return (
    <div className="container">
      <div className="form-check">
        <input
          type="radio"
          className="form-check-input"
          name="toast-type"
          id="toast-type-info"
          value="info"
          onChange={handleOptionChange}
        />
        <label className="form-check-label" htmlFor="toast-type-info">
          info
        </label>
      </div>

      <div className="form-check">
        <input
          type="radio"
          className="form-check-input"
          name="toast-type"
          id="toast-type-success"
          value="success"
          onChange={handleOptionChange}
        />
        <label className="form-check-label" htmlFor="toast-type-success">
          success
        </label>
      </div>
      <div className="form-check">
        <input
          type="radio"
          className="form-check-input"
          name="toast-type"
          id="toast-type-warning"
          value="warning"
          onChange={handleOptionChange}
        />
        <label className="form-check-label" htmlFor="toast-type-warning">
          warning
        </label>
      </div>
      <div className="form-check">
        <input
          type="radio"
          className="form-check-input"
          name="toast-type"
          id="toast-type-error"
          value="error"
          onChange={handleOptionChange}
        />
        <label className="form-check-label" htmlFor="toast-type-error">
          error
        </label>
      </div>
      <div>
        <button onClick={() => notify()}>Toast!</button>
        <ToastContainer />
      </div>
    </div>
  );
}
