import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <nav>
        <ul>
          <li>
            <NavLink
              className={(nav) => (nav.isActive ? "nav-active" : "")}
              to="/"
            >
              Accueil
            </NavLink>
          </li>
          <li>
            <NavLink
              className={(nav) => (nav.isActive ? "nav-active" : "")}
              to="/favorites"
            >
              Coups de coeur
            </NavLink>
          </li>
        </ul>
      </nav>
      <h1>The Tonight Film</h1>
      <h2>Ce que vous allez regarder ce soir n'est déjà plus un problème.</h2>
    </div>
  );
};

export default Header;
