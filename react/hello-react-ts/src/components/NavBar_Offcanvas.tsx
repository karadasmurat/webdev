import { NavLink } from "react-router-dom";
import image1 from "../assets/images/mk.webp";
import { Bs0Circle, BsPower, BsThreeDotsVertical } from "react-icons/bs";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function NavBar_Offcanvas() {
  const { authState, authDispatch } = useContext(AuthContext);

  function handleSignout() {
    console.log("Handle signout.");

    axios
      .post<{ sid: string; msg: string }>("/api/auth/signout", {
        withCredentials: true,
      })
      .then((response) => {
        // instead of setting data, we dispatch an action to set context.
        // setData(response.data);
        authDispatch({ type: "auth/logout" });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      {/* .navbar-expand{-sm | -md | -lg | -xl | -xxl} for responsive collapsing */}
      <nav className="navbar navbar-expand-md bg-primary-subtle">
        <div className="container">
          {/* toggler button - hamburger, on the left when collapsed */}
          <button
            className="navbar-toggler p-1"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          {/* brand, on the right (comes after hamburger) when collapsed */}
          <a className="navbar-brand" href="#">
            <img src={image1} alt="brand" width="30"></img>
            Offcanvas navbar
          </a>
          {/* top menu, as "Responsive Offcanvas" visible from md breakpoint (offcanvas-md) */}
          <div
            className="offcanvas-md offcanvas-end ms-auto"
            tabIndex={-1}
            id="offcanvasNavbarNav"
            aria-labelledby="offcanvasNavbarNavLabel"
          >
            <div className="offcanvas-body">
              <ul className="navbar-nav nav-underline">
                <li className="nav-item">
                  <NavLink to={`/`} className="nav-link">
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to={`/todos`} className="nav-link">
                    Todos
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to={`/context`} className="nav-link">
                    Context
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to={`/hooks`} className="nav-link">
                    Hooks
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to={`/page1`} className="nav-link">
                    Protected
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
          {/* <!-- BEGIN Profile dropdown --> */}
          {/* <!-- take a look at the dropdown component - to use in navbar, .nav-item is added to classNamelist--> */}
          <div className="nav-item dropdown ms-3">
            {/* <!-- .dropdown-toggle for small triangle on the right of the button --> */}
            <button
              className="btn btn-light p-0"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                src="https://source.unsplash.com/random/200x200/?portrait"
                width="40"
                className="rounded-start"
              />
              <BsThreeDotsVertical />
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
              <li>
                <h6 className="dropdown-header">Dropdown header</h6>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <button className="dropdown-item" type="button">
                  Action
                </button>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  <i className="bi bi-gear"></i> Action
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  <i className="bi bi-gear"></i> Another action
                </a>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <span className="dropdown-item p-0">
                  {/* <form action="/api/auth/signout" method="POST">
                    <button className="btn" type="submit">
                      <i className="bi bi-box-arrow-in-right"></i> Sign out
                    </button>
                  </form> */}

                  <button className="btn" onClick={handleSignout}>
                    <BsPower /> Sign out
                  </button>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {/* BEGIN drawer - offcanvas */}
      <div
        className="offcanvas offcanvas-start"
        tabIndex={-1}
        id="offcanvasNavbar"
        aria-labelledby="offcanvasNavbarLabel"
      >
        <div className="offcanvas-header border-bottom">
          <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
            Offcanvas
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Link
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Dropdown
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Something else here
                  </a>
                </li>
              </ul>
            </li>
          </ul>
          <form className="d-flex mt-3" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
