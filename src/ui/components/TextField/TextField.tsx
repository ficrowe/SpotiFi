import React, { ChangeEvent, InputHTMLAttributes, useState } from "react";
import styles from "./TextField.module.scss";
import Link from "../Link/Link";

interface ExtraInputProps {
  label: string;
  onChangeCallback: (value: string) => void;

  shouldValidate?: boolean;
  errorMessage?: string;

  link?: string;
  linkOnClick?: () => void;
}

type TextFieldProps = ExtraInputProps & InputHTMLAttributes<any>;

export default function TextField(props: {
  extraProps: ExtraInputProps;
  htmlProps?: InputHTMLAttributes<any>;
}) {
  const [focus, setFocus] = useState(false);
  const handleOnChange = (event: ChangeEvent<any>) => {
    props.extraProps.onChangeCallback(event.currentTarget.value);
  };
  return (
    <div className={styles.wrapper}>
      <label className={styles.label}>{props.extraProps.label}</label>
      <input
        {...props.htmlProps}
        className={styles.input}
        onChange={handleOnChange}
      />
      {props.extraProps.link && props.extraProps.linkOnClick && (
        <Link
          label={"Forgot Password?"}
          onClick={props.extraProps.linkOnClick}
        />
      )}
      {props.extraProps.shouldValidate == true && (
        <p className={styles.errorMessage}>{props.extraProps.errorMessage}</p>
      )}
    </div>
  );
}
