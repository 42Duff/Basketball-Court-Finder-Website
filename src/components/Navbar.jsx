import React from "react";
import { Link } from "react-router-dom";
import './Navbar.css';
import logo from "../assets/CourtFinder.svg";

function Navbar() {

    return (

        <nav className="navbar">
            <a href="/" className="navbarTitle">
                <img src={logo} className="logo" />
            </a>

            <ul className="navbarLinks">
                <li><Link to="/CommunitiesPage">Communities</Link></li>
                <li><Link to="/TrendingPage">Trending</Link></li>
                <li><Link to="/ContactPage">Contact</Link></li>
            </ul>

            <div className="loginMenu">
                <Link to="/login" className="loginBtn">Log In</Link>
                <Link to="/signup" className="signUpBtn">Sign Up</Link> 
            </div> 
        </nav>

    );
}

export default Navbar;