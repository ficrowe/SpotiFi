import React, { InputHTMLAttributes, useEffect, useState } from "react";
import styles from "./DropDownList.module.scss";
import DropDownItem, { DropDownOption } from "../DropDownItem/DropDownItem";
import { IoChevronDown } from "react-icons/io5";

export interface ExtraDropDownProps {
  label: string;
  onChangeCallback: (option: string) => void;

  selectedOption?: string;

  options: DropDownOption[];
}

type DropDownProps = ExtraDropDownProps & InputHTMLAttributes<any>;

export default function DropDownList(props: {
  extraProps: ExtraDropDownProps;
  htmlProps?: InputHTMLAttributes<any>;
}) {
  const [focus, setFocus] = useState(false);

  const PLACEHOLDER = "Select...";

  const handleOnChange = (selectedOption: string) => {
    props.extraProps.onChangeCallback(selectedOption);
    handleOnBlur();
  };

  const handleOnBlur = () => {
    setFocus(!focus);
  };

  const getSelectedOptionLabel = () => {
    const selectedOptionLabel = props.extraProps.options.find(
      (option) => option.value === props.extraProps.selectedOption
    )?.label;
    return selectedOptionLabel;
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.label}>{props.extraProps.label}</div>
      <div
        className={`${styles.select} ${
          props.extraProps.selectedOption ?? styles.placeholder
        }`}
        onClick={handleOnBlur}
        onBlur={handleOnBlur}
      >
        <>
          {props.extraProps.selectedOption
            ? getSelectedOptionLabel()
            : PLACEHOLDER}
          <IoChevronDown color={"black"} />
        </>
      </div>
      {focus && (
        <div className={styles.optionsWrapper}>
          {props.extraProps.options.map(
            (option: DropDownOption, index: number) => (
              <DropDownItem
                key={index}
                option={option}
                selected={option.value === props.extraProps.selectedOption}
                onClickCallback={handleOnChange}
              />
            )
          )}
        </div>
      )}
    </div>
  );
}
