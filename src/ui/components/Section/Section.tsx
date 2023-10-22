import React from "react";
import styles from "./Section.module.scss";
import { Axis } from "../../../constants/styleConstants";

interface SectionProps {
  centered?: boolean;
  children: React.ReactNode;
  layout?: Axis;
}
export default function Section(props: SectionProps) {
  return (
    <div
      className={`${styles.wrapper} ${
        props.layout === Axis.HORIZONTAL && styles.horizontal
      } ${props.centered && styles.centered}`}
    >
      {props.children}
    </div>
  );
}
