import { ReactNode } from "react";
import { BsGearFill } from "react-icons/bs";

interface ModalProps {
  title: string;
  btnTitle?: string;
  children: ReactNode;
}
export default function Modal({
  title,
  btnTitle = "Settings",
  children,
}: ModalProps) {
  return (
    <>
      {/* <!-- Button trigger modal --> */}
      <button
        type="button"
        className="btn btn-primary "
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        <span className="d-flex align-items-center">
          <BsGearFill /> &nbsp; {btnTitle}
        </span>
      </button>
      <button type="button" className="btn btn-primary">
        <span className="d-flex align-items-center">
          <BsGearFill />
        </span>
      </button>
      <button type="button" className="btn btn-info p-5 rounded-circle">
        100
      </button>

      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                {title}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">{children}</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
