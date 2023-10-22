import React, { ButtonHTMLAttributes } from "react";
import styles from "./Button.module.scss";

interface ExtraButtonProps {
  label: string;

  primary?: boolean;
  neutral?: boolean;
  invertColours?: boolean;
}

type ButtonProps = ExtraButtonProps & ButtonHTMLAttributes<any>;

export default function Button(props: {
  extraProps: ExtraButtonProps;
  htmlProps?: ButtonHTMLAttributes<any>;
}) {

  const getStyleForButton = (): React.CSSProperties => {
    let buttonStyle: React.CSSProperties;

    if (props.extraProps.neutral == true) {
      buttonStyle = styles.neutralButton
    } else if (props.extraProps.primary != false) {
      buttonStyle = styles.primaryButton;
    } else {
      buttonStyle = styles.secondaryButton
    }

    if (props.extraProps.invertColours) {
      buttonStyle = buttonStyle && styles.invertedButton
    }

    return buttonStyle
  }

  const getStyleForButtonLabel = (): React.CSSProperties => {
    let buttonLabelStyle: React.CSSProperties;

    if (props.extraProps.neutral == true) {
      buttonLabelStyle = styles.neutralLabel
    } else if (props.extraProps.primary != false) {
      buttonLabelStyle = styles.primaryLabel;
    } else {
      buttonLabelStyle = styles.secondaryLabel
    }

    if (props.extraProps.invertColours) {
      buttonLabelStyle = buttonLabelStyle && styles.invertedLabel
    }

    return buttonLabelStyle
  }

  return (
    <div>
      <button
        {...props.htmlProps}
        className={`${getStyleForButton()}`}
      >
        <div
          className={`${getStyleForButtonLabel()}`}
        >
          {props.extraProps.label}
        </div>
      </button>
    </div>
  );
}
