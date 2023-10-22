import React from "react";
import styles from "./AccountSummary.module.scss";
import { User } from "../../../models/User";
import Button from "../Button/Button";
import {
  AccountMenuOption,
  DEFAULT_PROFILE_PHOTO,
} from "../AccountDropDownList/AccountDropDownList";
import { useNavigate } from "react-router-dom";

interface AccountSummaryProps {
  user: User;
  selectedMenuOption: AccountMenuOption;
}
export default function AccountSummary(props: AccountSummaryProps) {
  const navigate = useNavigate();

  return (
    <div className={styles.wrapper}>
      <div className={styles.profilePicture}>
        {props.user.profilePicture
          ? props.user.profilePicture
          : DEFAULT_PROFILE_PHOTO({ color: "darkGrey", size: 150 })}
      </div>
      <div className={styles.name}>
        {`${props.user.firstName} ${props.user.lastName}`}
      </div>
      <div className={styles.availableTokens}>
        {`${props.user.availableTokens} available tokens`}
      </div>
      <div className={styles.menuOptions}>
        <Button
          extraProps={{
            label: AccountMenuOption.ACCOUNT_DETAILS.toString(),
            primary:
              props.selectedMenuOption === AccountMenuOption.ACCOUNT_DETAILS,
          }}
          htmlProps={{
            onClick: () => navigate("/account"),
          }}
        />
        <Button
          extraProps={{
            label: AccountMenuOption.MANAGE_TOKENS.toString(),
            primary:
              props.selectedMenuOption === AccountMenuOption.MANAGE_TOKENS,
          }}
          htmlProps={{
            onClick: () => navigate("/account/tokens"),
          }}
        />
      </div>
    </div>
  );
}
