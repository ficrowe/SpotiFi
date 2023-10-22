import React from "react";
import Logo from "../Logo/Logo";
import styles from "./Header.module.scss";
import Link from "../Link/Link";
import Title from "../Title/Title";
import Heading, { HeadingLevel } from "../Heading/Heading";

interface HeaderProps {
  invertColours?: boolean;
  children?: React.ReactNode;
}
export default function Header(props: HeaderProps) {
  return (
    <div
      className={props.invertColours ? styles.invertedHeader : styles.header}
    >
      <div className={styles.contentWrapper}>
        <div className={styles.logoWrapper}>
          <Logo invertColours={props.invertColours} />
        </div>
        <div className={styles.headingWrapper}>
          <Heading color="white" level={HeadingLevel.HEADING1}>SpotiFi</Heading>
        </div>
        <div className={styles.childrenWrapper}>
          {props.children}
          </div>
      </div>
    </div>
  );
}
