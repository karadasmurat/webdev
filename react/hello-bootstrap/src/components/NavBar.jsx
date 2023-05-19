export default function NavBar() {
  return (
    <nav
      className="navbar navbar-expand-md bg-body-tertiary"
      data-bs-theme="dark"
    >
      <div className="container-fluid">
        {/* toggler button - hamburger, on the left when collapsed */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* brand, on the right (comes after hamburger) when collapsed */}
        <a className="navbar-brand" href="#">
          Brand
        </a>

        {/* area that is collapsed */}
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <div className="navbar-nav">
            <a
              href="/campgrounds"
              className="nav-link active"
              aria-current="page"
            >
              Campgrounds
            </a>
            <a className="nav-link" href="#">
              Features
            </a>
            <a className="nav-link" href="#">
              {/* <!-- ternary expression, set the username field --> */}
              {/* <!-- note undefined checked on ejs --> */}
              <i className="bi bi-person-circle"></i>
              anonymous
            </a>
          </div>

          {/* <!-- right-align using ms-auto --> */}
          <div className="navbar-nav ms-auto">
            <a href="/signin" className="nav-link" aria-current="page">
              Sign in
            </a>
            <a href="/register" className="nav-link" aria-current="page">
              Register
            </a>

            {/* <!-- BEGIN DROPDOWN --> */}
            {/* <!-- take a look at the dropdown component, .nav-item is added to classNamelist--> */}
            <div className="nav-item dropdown">
              {/* <!-- .dropdown-toggle for small triangle on the right of the button --> */}
              <button
                className="btn btn-light "
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="bi bi-gear"></i>
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
                    <form action="/signout" method="POST">
                      <button className="btn" type="submit">
                        <i className="bi bi-box-arrow-in-right"></i> Sign out
                      </button>
                    </form>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
