import React from "react";

const Footer = () => {
  return (
    <div className="page-footer font-small special-color-dark pt-4 ">
      <div
        className="footer-copyright text-center py-3"
        style={{ background: "#203040", color: "white" }}
      >
        M@k_Shop | All Rights Reserved © {new Date().getFullYear()} Copyright:
        <a href="/"> M@k_Shop.com</a>
      </div>
    </div>
  );
};

export default Footer;
