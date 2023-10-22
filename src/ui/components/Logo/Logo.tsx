import React from "react";
import logoImage from "../../../assets/logo-light.png";
import invertedLogoImage from "../../../assets/logo-dark.png";
import styles from "./Logo.module.scss";
import { useNavigate } from "react-router-dom";

interface LogoProps {
  invertColours?: boolean;
  onClick?: () => void;
}

export default function Logo(props: LogoProps) {
  const navigate = useNavigate();

  return (
    <div className={styles.logo} onClick={() => props.onClick ?? navigate("/")}>
      {props.invertColours ? (
        <img src={invertedLogoImage} className={styles.image} />
      ) : (
        <img src={logoImage} className={styles.image} />
      )}
    </div>
  );
}
