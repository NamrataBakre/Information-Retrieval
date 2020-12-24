import React from "react";
import { NavLink } from "react-router-dom";
import SearchBarTest from"./SearchBarTest";

export default function NavBarNew() {
  return (
    <div>
    <div className="child">
      <ul className="menu">
        <li>
          <HeaderNavItem exact to="/" name="Home" />
        </li>
        <li>
          <HeaderNavItem
            exact
            to="/overviewanalysis"
            name="Overview Analysis"
          />
        </li>
        <li>
          <HeaderNavItem exact to="/topic" name="Topic Analysis" />
          
        </li> 
      </ul>
      
    </div>
    
    
    </div>
  );
}

function HeaderNavItem(props) {
  return (
    <NavLink
      to={props.to}
      exact={props.exact ? true : false}
      activeClassName="active"
    >
      {props.name}
    </NavLink>
  );
}
