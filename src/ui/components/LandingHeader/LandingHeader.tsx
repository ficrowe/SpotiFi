import React from "react";
import Logo from "../Logo/Logo";
import styles from "./LandingHeader.module.scss";
import Button from "../Button/Button";
import Title from "../Title/Title";
import { useNavigate } from "react-router-dom";

export enum HeaderState {
  SHORT,
  TALL,
}
export default function LandingHeader(props: { headerScale: HeaderState }) {
  const navigate = useNavigate();

  return (
    <div
      className={styles.header}
      style={{
        height: props.headerScale === HeaderState.SHORT ? "100px" : "200px",
      }}
    >
      <div className={styles.contentWrapper}>
        <div className={styles.logoWrapper}>
          <div
            className={styles.logo}
            style={{
              height:
                props.headerScale === HeaderState.SHORT ? "50px" : "150px",
            }}
          >
            <Logo />
          </div>
          <Title
            style={{
              fontSize:
                props.headerScale === HeaderState.SHORT ? "2.5rem" : "5rem",
            }}
          >
            SpotiFi
          </Title>
        </div>
        <div className={styles.childrenWrapper}>
          {
            <>
              <Button
                extraProps={{
                  label: "LOGIN",
                  invertColours: false,
                }}
                htmlProps={{
                  onClick: () => navigate("/login"),
                }}
              />
              <Button
                extraProps={{
                  label: "CREATE ACCOUNT",
                  invertColours: false,
                }}
                htmlProps={{
                  onClick: () => navigate("/register"),
                }}
              />
            </>
          }
        </div>
      </div>
    </div>
  );
}
