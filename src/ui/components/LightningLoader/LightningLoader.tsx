import React from "react";
import styles from "./LightningLoader.module.scss";

interface LightningLoaderProps {
  strokeColour?: string;
}

export default function LightningLoader(props: LightningLoaderProps) {
  return (
    <svg className={styles.path} viewBox="0 0 24 24" fill="none">
      <path
        d="M6 12L8 3H15.5L14 8.99991H18L9 21L10.5 12H6Z"
        stroke={props.strokeColour ?? "#000000"}
        stroke-width="1"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
