import React from "react";
import styles from "./MacropadKey.module.scss";
import { DeviceKey } from "../../../models/Device";

export interface MacropadKeyProps {
    deviceKey: DeviceKey;
    selected?: boolean;
    onClick: Function;
}

export default function MacropadKey(props: MacropadKeyProps) {

    const content = () => (
        <div className={`${styles.container} ${props.selected && styles.selected}`} onClick={() => props.onClick()}>
            <div className={styles.bottomLayer}>
                <div className={styles.topLayer} />
            </div>
        </div>
    )

    return props.selected ?
        <div className={styles.backlit}>
            {content()}
        </div>
        : content();
}