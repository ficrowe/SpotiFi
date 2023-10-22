import React from "react";
import styles from "./Layout.module.scss";

interface LayoutProps {
  centered?: boolean;
  color?: string;
  children: React.ReactNode;
}
export default function Layout(props: LayoutProps) {
  return (
      <div className={`${styles.wrapper} ${props.centered && styles.centered}`}>
        {props.children}
      </div>
  );
}
