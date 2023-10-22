import React, { ChangeEvent, InputHTMLAttributes, useState } from "react";
import styles from "./TextBox.module.scss";
import layoutStyles from "../../styles/LayoutStyles.module.scss";
import Link from "../Link/Link";

interface ExtraInputProps {
  label: string;
  onChangeCallback: (value: string) => void;

  link?: string;
  linkOnClick?: () => void;

  topRightContent?: React.ReactNode;
}

type TextFieldProps = ExtraInputProps & InputHTMLAttributes<any>;

export default function TextBox(props: {
  extraProps: ExtraInputProps;
  htmlProps?: InputHTMLAttributes<any>;
}) {
  const [focus, setFocus] = useState(false);
  const handleOnChange = (event: ChangeEvent<any>) => {
    props.extraProps.onChangeCallback(event.currentTarget.value);
  };
  return (
    <div className={styles.wrapper}>
      <div className={layoutStyles.row}>
        <label className={styles.label}>{props.extraProps.label}</label>
        {props.extraProps.topRightContent && (
          <span className={styles.topRightContent}>
            {props.extraProps.topRightContent}
          </span>
        )}
      </div>
      <textarea
        {...props.htmlProps}
        className={styles.input}
        onChange={handleOnChange}
      />
      {props.extraProps.link && props.extraProps.linkOnClick && (
        <Link
          label={props.extraProps.link}
          onClick={props.extraProps.linkOnClick}
        />
      )}
    </div>
  );
}
