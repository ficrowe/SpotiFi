import React from "react";
import styles from "./RadioButton.module.scss";
import {
  Axis,
  primaryGrey,
  secondaryPurple,
} from "../../../constants/styleConstants";
import { IconType } from "react-icons";

export interface RadioButtonItem {
  label?: string;
  icon?: IconType;
  value: string;
  checked: boolean;
}

export interface RadioButtonProps extends RadioButtonItem {
  layout?: Axis;
  onClickCallback?: (value: string) => void;
}

export default function RadioButton(props: RadioButtonProps) {
  const handleOnClick = () => {
    props.onClickCallback && props.onClickCallback(props.value);
  };

  return (
    <div className={styles.radioButton} onClick={handleOnClick}>
      <input type={"radio"} />
      {props.icon ? (
        <span className={styles.icon}>
          {props.icon({
            color: props.checked ? secondaryPurple : primaryGrey,
            size: 50,
          })}
        </span>
      ) : (
        <span className={styles.input} />
      )}
      {props.label && <label className={styles.label}>{props.label}</label>}
    </div>
  );
}
