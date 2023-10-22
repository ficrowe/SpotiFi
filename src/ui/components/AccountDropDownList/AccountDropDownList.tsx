import React, { ChangeEvent, ChangeEventHandler, InputHTMLAttributes, SelectHTMLAttributes, useContext, useState } from "react";
import styles from "./AccountDropDownList.module.scss";
import DropDownItem, { DropDownOption } from "../DropDownItem/DropDownItem";
import { IoChevronDown } from "react-icons/io5";
import { VscAccount } from "react-icons/vsc";
import { ApplicationContext } from "../../../context/ApplicationContext";
import { ApplicationContextProps } from "../../../context/ApplicationContext";
import { useNavigate } from "react-router-dom";

export enum AccountMenuOption {
  LOGOUT = "LOGOUT",
}

export const DEFAULT_PROFILE_PHOTO = VscAccount;

export default function AccountDropDownList() {
  const [focus, setFocus] = useState(false);
  const { user, setUser } = useContext<ApplicationContextProps>(ApplicationContext);
  const navigate = useNavigate();

  const handleOnChange = (selectedOption: string) => {
    switch (selectedOption) {
      case AccountMenuOption.LOGOUT.toString():
        setUser(undefined);
        navigate("/login");
        break;
    }
  };

  const handleOnClick = () => {
    setFocus(!focus);
  };

  const handleOnBlur = () => {
    setFocus(false);
  };

  return (
    <div className={styles.wrapper}>
      <div
        className={styles.select}
        onClick={handleOnClick}
        onBlur={handleOnBlur}
      >
        <div className={styles.profileWrapper}>
          {DEFAULT_PROFILE_PHOTO({ color: "white", size: 50 })}
          {user?.firstName + " " + user?.lastName}
        </div>
        <IoChevronDown color={"white"} />
      </div>
      {focus && (
        <div className={styles.optionsWrapper}>
          {Object.values(AccountMenuOption).map((option: AccountMenuOption, index: number) => (
            <AccountMenuItem
              key={index}
              option={option}
              onClick={() => handleOnChange(option)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

interface AccountMenuItemProps extends SelectHTMLAttributes<AccountMenuOption> {
  option: AccountMenuOption;
  onClick: () => void;
}

function AccountMenuItem(props: AccountMenuItemProps) {
  return (
  <div className={styles.menuItem} onClick={props.onClick}>
    {props.option}
  </div>)
}