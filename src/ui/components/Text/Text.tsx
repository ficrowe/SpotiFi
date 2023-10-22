import React from "react";
import styles from "./Text.module.scss";

export enum TextSize {
  SMALL,
  MEDIUM,
  LARGE
}

interface TextProps {
  children: string | string[];
  color?: string;
  size?: TextSize;
}

export default function Text(props: TextProps) {

  const textStyle = (): string => {
    switch (props.size) {
      case TextSize.SMALL:
        return styles.smallText;
      default:
      case TextSize.MEDIUM:
        return styles.mediumText;
      case TextSize.LARGE:
        return styles.largeText;
    }
  }

  return (
    <div className={styles.wrapper}>
      <p className={textStyle()} style={{ color: props.color }}>
        {props.children}
      </p>
    </div>
  );
}
