import React from "react";
import styles from "./RadioGroup.module.scss";
import { Axis } from "../../../constants/styleConstants";
import RadioButton, { RadioButtonProps } from "../RadioButton/RadioButton";

interface RadioGroupProps {
  label: string;

  layout?: Axis;

  options: RadioButtonProps[];

  onChangeCallback: (value: string) => void;

  selectedOption?: string;
}

export default function RadioGroup(props: RadioGroupProps) {
  const handleOnChange = (value: string) => {
    props.onChangeCallback(value);
  };

  return (
    <div
      className={`${styles.radioGroup} ${
        props.layout !== Axis.HORIZONTAL && styles.vertical
      }`}
    >
      <div className={styles.label}>{props.label}</div>
      {props.layout !== Axis.HORIZONTAL && <br />}
      <div
        className={`${styles.options} ${
          props.layout == Axis.HORIZONTAL ? styles.horizontal : styles.vertical
        }`}
      >
        {props.options.map((option: RadioButtonProps, index: number) => (
          <RadioButton
            {...option}
            key={index}
            layout={props.layout}
            onClickCallback={handleOnChange}
            checked={props.selectedOption == option.value}
          />
        ))}
      </div>
    </div>
  );
}
