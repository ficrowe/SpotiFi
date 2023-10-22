import React from "react";
import styles from "./DropDownItem.module.scss";

export interface DropDownOption {
  label: string;
  value: string;
}

interface DropDownItemProps {
  option: DropDownOption;
  onClickCallback: (option: string) => void;
  selected?: boolean;
}

export default function DropDownItem(props: DropDownItemProps) {
  const handleOnClick = () => {
    props.onClickCallback(props.option.value);
  };
  return (
    <div className={styles.item} onClick={handleOnClick}>
      <div className={props.selected ? styles.selectedLabel : styles.label}>
        {props.option.label}
      </div>
    </div>
  );
}
