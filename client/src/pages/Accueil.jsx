import React from "react";
import { useRouteMatch } from "react-router-dom";
import { Link } from "react-router-dom";

const Accueil = () => {
  let { path, url } = useRouteMatch();
  return (
    <div>
      <h1>Accueil</h1>
      <ul>
        <li>
          <Link to={`${url}accueil/`}>Test</Link>
        </li>
      </ul>
    </div>
  );
};

export default Accueil;
