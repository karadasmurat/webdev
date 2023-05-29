import { FaUserCircle } from "react-icons/fa";
import { BsBatteryCharging } from "react-icons/bs";

// The type for the component props
interface GreeterProps {
  name: string;
  location?: string;
}

export default function Greeter({ name, location = "Shire" }: GreeterProps) {
  return (
    <>
      <div className="card text-bg-light my-1">
        <div className="card-header d-flex justify-content-between align-items-center">
          Greetings
          <BsBatteryCharging />
        </div>
        <div className="card-body">
          <h5 className="card-title">
            <FaUserCircle /> {name}
          </h5>
          <h6 className="card-subtitle mb-2 text-body-secondary">{location}</h6>
        </div>
      </div>
    </>
  );
}
