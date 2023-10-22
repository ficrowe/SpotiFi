import React, { useContext, useState } from "react";
import styles from "./Macropad.module.scss";
import MacropadKey, { MacropadKeyProps } from "../MacropadKey/MacropadKey";
import { DeviceKey } from "../../../models/Device";
import { ShortcutContextProps, ShortcutContext } from "../../screens/ShortcutScreen/context";

export interface MacropadProps {
    keys: Array<DeviceKey>;
    disabled?: boolean;
}

export default function Macropad({ keys, disabled }: MacropadProps) {
    const { selectedDeviceKey, setSelectedDeviceKey } = useContext<ShortcutContextProps>(ShortcutContext)

    const handleKeyClick = (clickedKey: DeviceKey) => {
      if (disabled != true) {
        console.log(clickedKey)
        if (clickedKey == selectedDeviceKey) {
          setSelectedDeviceKey(undefined)
        } else {
          setSelectedDeviceKey(clickedKey)
        }
      }
    }
    
    return (
        <div className={styles.deviceWrapper}>
            {keys.map((deviceKey: DeviceKey, index: number) => 
                <MacropadKey key={index} deviceKey={deviceKey} selected={deviceKey == selectedDeviceKey} onClick={() => handleKeyClick(deviceKey)}/>
            )}
        </div>
    )
}