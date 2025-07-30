import React from "react";
import styles from "./Link.module.scss";

interface LinkProps {
  primary?: boolean;
  label: string;

  onClick: () => void;
}

export default function Link(props: LinkProps) {
  return (
    <div className={props.primary ? styles.primaryLink : styles.secondaryLink}>
      {props.label}
    </div>
  );
}
