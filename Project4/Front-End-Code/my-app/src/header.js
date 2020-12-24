import React from "react";
import TWOVID from './TWOVID.png';

function Header() {
  return (
    <div className="header">
      <img src={ TWOVID } alt="TWOVID" width="16%" height="8%" style={{verticalalign:"left"}} />   
    </div>
  );
}

export default Header;
