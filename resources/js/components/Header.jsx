import React from 'react';
import '../../css/component.css';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location =useLocation();
  console.log(location)
  return (
    <nav className="navbar">
      <div className="logo">
        <span>MyLogo</span>
      </div>
      <ul className="nav-items">
        <li className={`nav-item ${location.pathname === '/' ? 'text-warning' : ''}` }><Link to="/">home</Link></li>
        <li className={`nav-item ${location.pathname ==='/tasks' ? 'text-warning' : ''}`}><Link to="/tasks">latk list</Link></li>
        <li className={`nav-item ${location.pathname ==='/calendar' ? 'text-warning' : ''}`}><Link to="/calendar">calendar</Link></li>
        <li className={`nav-item ${location.pathname ==='/calendar' ? 'text-warning' : ''}`}><Link to="/add"></Link></li>

      </ul>
    </nav>
  );
}

export default Navbar;
