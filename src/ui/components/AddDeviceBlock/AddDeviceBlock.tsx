import React, { useState } from "react";
import { HiPlus } from "react-icons/hi2";
import styles from "./AddDeviceBlock.module.scss";
import TextField from "../TextField/TextField";
import Button from "../Button/Button";
import useAuthListener from "../../../firebase/AuthListener";
import { linkDeviceToUser } from "../../../api/deviceAPI";
import { useNavigate } from "react-router-dom";

interface AddDeviceBlockProps {
  onDeviceAdd: Function;
}

export function AddDeviceBlock(props: AddDeviceBlockProps) {
  const { user } = useAuthListener();
    const [focus, setFocus] = useState<boolean>(false);
    const [deviceId, setDeviceId] = useState<string>("");
    const [deviceName, setDeviceName] = useState<string>("");
    const navigate = useNavigate();

    const addDevice = () => {
      if (user != undefined) {
        linkDeviceToUser(user.id, deviceId, deviceName).finally(() => {
          props.onDeviceAdd()
        })
      }
    }

    const cancel = () => {
      setFocus(false);
    }
    
    if (!focus) {
      return (
        <div className={styles.plusIconContainer} onClick={() => setFocus(true)}>
          <HiPlus size={100} className={styles.plusIcon} />
        </div>
      )
    } else {
        return (
          <div className={styles.container}>
            <TextField extraProps={{ label: "Device id", onChangeCallback: setDeviceId }} />
            <TextField extraProps={{ label: "Device name", onChangeCallback: setDeviceName }} />
            <div className={styles.buttonWrapper}>
              <Button extraProps={{ label: "Cancel", neutral: true }} htmlProps={{ onClick: cancel }}/>
              <Button extraProps={{ label: "Add device" }} htmlProps={{ onClick: addDevice }}/>
            </div>
          </div>
        )
    }
}