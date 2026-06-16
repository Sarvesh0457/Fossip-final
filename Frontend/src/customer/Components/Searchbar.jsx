import React from "react";
import searchIcon from "../Assets/Search.png";
import "./Searchbar.css";

const Searchbar = () => {
  return (
    <div className="modern-searchbar">
      <img src={searchIcon} alt="search" className="search-icon" />
      <input type="text" placeholder="Search products..." />
    </div>
  );
};

export default Searchbar;