import React from "react";
import RpsLogo from "../rps-logo/rps-logo";
// Import your logo component or replace with your logo image


const AppBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container-fluid">
        <div className="navbar-brand">
          <RpsLogo />
        </div>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto ms-5 mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link app-bar-nav-link" href="/dashboard">
                Dashboard
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link app-bar-nav-link" href="/backlog">
                Backlog
              </a>
            </li>
          </ul>
          <div className="d-flex">
            <div className="avatar">
              <img
                className="img-fluid rounded-circle"
                style={{ width: "30px", height: "30px", position: "relative" }}
                src="/assets/img/me/me.png"
                alt="User Avatar"
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AppBar;
