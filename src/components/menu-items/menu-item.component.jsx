import React from "react";
import { useNavigate } from "react-router-dom";
import "./menu-item.style.scss";

// * we have access to history because we wrapped it
const MenuItem = ({ title, imageUrl, size, linkUrl }) => {
  const navigate = useNavigate();

  const d = [linkUrl];
  const k = [];

  for (const l of d) {
    k.push(l);
  }

  // * I'M JUST TOO GOOD
  return (
    <div className={`${size} menu-item`} onClick={() => navigate(k[0])}>
      <div
        className="background-Image"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <div className="content">
        <h1 className="title">{title.toUpperCase()}</h1>
        <span className="subtitle">SHOP NOW</span>
      </div>
    </div>
  );
};

export default MenuItem;
