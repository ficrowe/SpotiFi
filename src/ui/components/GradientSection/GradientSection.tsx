import React from "react";
import styles from "./GradientSection.module.scss";

interface GradientSectionProps {
  centered?: boolean;
  children: React.ReactNode;
}
export default function GradientSection(props: GradientSectionProps) {
  return (
    <div className={`${styles.wrapper} ${props.centered && styles.centered}`}>
      {props.children}
    </div>
  );
}
