import React from "react";
import { Link } from "react-router-dom";

const Header = () => (
  <header>
    <div className="container">
      <Link to="/" style={{textDecoration: 'none'}}>
        <h1>     Салон Красоты</h1>
      </Link>
      <nav>
        <Link to="/">Главная</Link>
        <Link to="/profile">Профиль</Link>
      </nav>
    </div>
  </header>
);

export default Header;