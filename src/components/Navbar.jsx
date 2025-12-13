import React from "react";
import './Navbar.css';
import logo from "../assets/CourtFinder.svg";

function Navbar() {

    return (

        <nav className="navbar">
            <a href="/" className="navbar-title">
                <img src={logo} className="logo" />
            </a>

            <ul className="navbar-links">
                <li><a href="/communities">Communities</a></li>
                <li><a href="/contact">Contact</a></li>
            </ul>
            
        </nav>
    );
}

export default Navbar;