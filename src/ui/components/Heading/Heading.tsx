import React from "react";
import styles from "./Heading.module.scss";
export enum HeadingLevel {
  HEADING1,
  HEADING2,
  HEADING3,
  HEADING4,
  HEADING5,
  HEADING6,
}
interface HeadingProps {
  children: string;
  level: HeadingLevel;
  color?: string;
}

export default function Heading(props: HeadingProps) {
  const getHeadingTagForLevel = () => {
    switch (props.level) {
      case HeadingLevel.HEADING1:
        return (
          <h1 className={styles.heading} style={{ color: props.color }}>
            {props.children}
          </h1>
        );
      case HeadingLevel.HEADING2:
        return (
          <h2 className={styles.heading} style={{ color: props.color }}>
            {props.children}
          </h2>
        );
      case HeadingLevel.HEADING3:
        return (
          <h3 className={styles.heading} style={{ color: props.color }}>
            {props.children}
          </h3>
        );
      case HeadingLevel.HEADING4:
        return (
          <h4 className={styles.heading} style={{ color: props.color }}>
            {props.children}
          </h4>
        );
      case HeadingLevel.HEADING5:
        return (
          <h5 className={styles.heading} style={{ color: props.color }}>
            {props.children}
          </h5>
        );
      case HeadingLevel.HEADING6:
        return (
          <h6 className={styles.heading} style={{ color: props.color }}>
            {props.children}
          </h6>
        );
    }
  };

  return <div className={styles.wrapper}>{getHeadingTagForLevel()}</div>;
}
