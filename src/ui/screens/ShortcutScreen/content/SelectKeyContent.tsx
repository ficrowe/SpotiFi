import React, { useContext, useEffect } from "react";
import layoutStyles from "../../../styles/LayoutStyles.module.scss";
import styles from "../ShortcutScreen.module.scss";
import Text, { TextSize } from "../../../components/Text/Text";
import { device } from "../../../../models/Devices";
import Macropad from "../../../components/Macropad/Macropad";
import { ShortcutContextProps, ShortcutContext } from "../context";
import { getDeviceComponent } from "../../../../utils/DeviceUtils";
import LightningLoader from "../../../components/LightningLoader/LightningLoader";
import { ApplicationContextProps } from "../../../../context/ApplicationContext/context";
import { ApplicationContext } from "../../../../context/ApplicationContext/context";

export default function SelectKeyContent() {
  const { selectedDevice } = useContext<ShortcutContextProps>(ShortcutContext)
  const { loading, setLoading } = useContext<ApplicationContextProps>(ApplicationContext)
  
  useEffect(() => {
    setLoading(true)
  }, [])

  useEffect(() => {
    if (selectedDevice != undefined) {
      setLoading(false)
    }
  }, [selectedDevice])

  return (
          <div key={"selectKeyContent"}>
            <div className={styles.contentWrapper}>
              <Text color="white" size={TextSize.LARGE}>Select a device key to trigger a shortcut.</Text>
              {loading
                  ? (<div className={styles.loaderWrapper}>
                      <div className={styles.loader}>
                        <LightningLoader strokeColour="#6de997" />
                      </div>
                    </div>)
                  : (selectedDevice && <div className={styles.deviceWrapper}>{getDeviceComponent(selectedDevice)}</div>)}
            </div>
        </div>
  );
}