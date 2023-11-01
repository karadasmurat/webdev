import { Outlet } from "react-router-dom";
import fkhLogo from "../assets/images/logo-scaled-300x136.png";
import svg_login from "../assets/svg/undraw_login_re_4vu2.svg";

export default function AuthLayout() {
  return (
    <div className="container">
      <div className="row justify-content-center align-items-center flex-grow-1 vh-100">
        <div className="col-md-6 text-center" style={{ maxWidth: "500px" }}>
          <img
            // src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
            src={svg_login}
            className="img-fluid"
            alt="Brand image"
          />
        </div>
        <div className="col-md-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
