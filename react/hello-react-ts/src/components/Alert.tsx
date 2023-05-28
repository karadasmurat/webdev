import { ReactNode, useState } from "react";

interface AlertProps {
  children: ReactNode;
  type: string;
}

export default function Alert({ children, type }: AlertProps) {
  const [visible, setVisibility] = useState(true);
  return (
    <>
      {visible && (
        <div className={"alert alert-" + type + " alert-dismissible"}>
          {children}
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
            onClick={() => {
              setVisibility(false);
            }}
          ></button>
        </div>
      )}
    </>
  );
}
