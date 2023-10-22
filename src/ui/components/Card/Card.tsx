import React from "react";
import styles from "./Card.module.scss";

// export enum CardStyle {
//   LIGHT,
//   DARK
// }

interface CardProps {
  children: React.ReactNode;
  showBorder?: boolean;
  style?: React.CSSProperties;
}
export default function Card(props: CardProps) {
  return (
    <div
      className={`${styles.wrapper} ${props.showBorder != false && styles.border}`}
      style={props.style}
    >
      {props.children}
    </div>
  );
}
