import React from "react";
import Globe from "../img/static/globe.png";
import FooterStyles from "./Footer.module.css";

const Footer = () => {
  return (
      <div className={FooterStyles.footer}>
        <img className={FooterStyles.footerImage} src={Globe}/>
        <div className={FooterStyles.message}>
          Fostering connection and awareness of UNCA's connections and resources across the globe. 
        </div>
        <img className={FooterStyles.footerImage} src={Globe}/>
      </div>
  );
};

export default Footer;
