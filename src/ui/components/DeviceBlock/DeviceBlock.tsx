import React, { useContext, useState } from "react";
import { HiPlus } from "react-icons/hi2";
import styles from "./DeviceBlock.module.scss";
import TextField from "../TextField/TextField";
import Button from "../Button/Button";
import useAuthListener from "../../../firebase/AuthListener";
import { linkDeviceToUser } from "../../../api/deviceAPI";
import { Device } from "../../../models/Device";
import Heading, { HeadingLevel } from "../Heading/Heading";
import { getDeviceComponent } from "../../../utils/DeviceUtils";
import { GrEdit } from "react-icons/gr"
import { useNavigate } from "react-router-dom";
import { ShortcutContextProps } from "../../screens/ShortcutScreen/context";
import { ShortcutContext } from "../../screens/ShortcutScreen/context";
import { setLocalState } from "../../../utils/StateUtils";
import ShortcutBlock from "../ShortcutBlock/ShortcutBlock";
import { SpotifyShortcut, getDisplayNameForType } from "../../../models/SpotifyShortcut";
import { SpotifyActionArgument } from "../../../models/SpotifyAction";

interface DeviceBlockProps {
  device: Device;
}

export function DeviceBlock({ device }: DeviceBlockProps) {
  const { setSelectedDevice, selectedDeviceKey } = useContext<ShortcutContextProps>(ShortcutContext)
  const navigate = useNavigate();

  const editDevice = () => {
    setSelectedDevice(device)
    setLocalState("selectedDevice", device.id)
    navigate("/shortcuts")
  }
  
  const enrichShortcut = (originalShortcut: SpotifyShortcut): SpotifyShortcut => {
    const shortcut = originalShortcut;
    shortcut.displayName = getDisplayNameForType(shortcut.type)
    return shortcut;
  }

  return (
      <div className={styles.container}>
        <div className={styles.heading}>
          <Heading color={"#404040"} level={HeadingLevel.HEADING2}>{device.name}</Heading>
          <div className={styles.editIcon} onClick={editDevice}>
            <GrEdit size={35} />
          </div>
        </div>
        {getDeviceComponent(device)}
        

        {selectedDeviceKey?.shortcut &&
          <div className={styles.shortcutWrapper}>
            <div className={styles.shortcutBlockWrapper}>
              <ShortcutBlock shortcut={enrichShortcut(selectedDeviceKey.shortcut)} />
            </div>
            <div className={styles.inputTypeWrapper}>
              {selectedDeviceKey.shortcut.inputTypes?.map((inputType: SpotifyActionArgument, index: number) => (
                <div className={styles.inputTypeWrapper} key={index}>
                  <Heading level={HeadingLevel.HEADING2} color="white">{inputType}</Heading>
                  <div className={styles.shortcutInputVariablesWrapper}>
                    <div className={styles.selected}>
                      <p>{selectedDeviceKey.shortcut?.inputs?.getVariable(inputType)?.label}</p>
                    </div>
                  </div>
                </div>
               ))}
            </div>
          </div>
        }
      </div>
    )
  }