import React from "react";
import styles from "./Title.module.scss";

interface TitleProps {
  children: React.ReactNode;
  color?: string;
  style?: React.CSSProperties;
}

export default function Title(props: TitleProps) {
  return (
    <div className={styles.wrapper}>
      <h1
        className={styles.title}
        style={{ color: props.color, ...props.style }}
      >
        {props.children}
      </h1>
    </div>
  );
}
