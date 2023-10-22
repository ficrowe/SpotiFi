import React, { useContext, useEffect, useState } from "react";
import layoutStyles from "../../../styles/LayoutStyles.module.scss";
import styles from "../ShortcutScreen.module.scss";
import Text, { TextSize } from "../../../components/Text/Text";
import { SpotifyShortcut, SpotifyShortcutVariable, SpotifyShortcutVariables } from "../../../../models/SpotifyShortcut";
import { ShortcutContext, ShortcutContextProps } from "../context";
import { SpotifyActionArgument, SpotifyActionVariables } from "../../../../models/SpotifyAction";
import { getPlaylists } from "../../../../api/spotifyAPI";
import ShortcutBlock from "../../../components/ShortcutBlock/ShortcutBlock";
import { SpotifyPlaylist } from "../../../../models/SpotifyPlaylist";
import Macropad from "../../../components/Macropad/Macropad";
import { device } from "../../../../models/Devices";
import Heading, { HeadingLevel } from "../../../components/Heading/Heading";
import { getDeviceComponent } from "../../../../utils/DeviceUtils";

export default function ConfirmShortcutContent() { 
  const { selectedShortcut, selectedDevice, selectedDeviceKey, selectedInputType, setSelectedInputType, selectedInputs, setSelectedInputs } = useContext<ShortcutContextProps>(ShortcutContext);

  const handleInputTypeClick = (inputType?: SpotifyActionArgument) => {
    if (selectedInputType == inputType) {
      setSelectedInputType(undefined);
    } else {
      setSelectedInputType(inputType);
    }
  }

  return (selectedShortcut != undefined
            ? (<div className={layoutStyles.contentWrapper} key={"selectShortcutInputsContent"}>
                <div className={styles.contentWrapper}>
                  <Text color="white" size={TextSize.LARGE}>Confirm your selections.</Text>
                  <div className={styles.confirmSelectionsWrapper}>
                    {selectedDevice && getDeviceComponent(selectedDevice, true)}
                    <div className={styles.shortcutInputsWrapper}>
                      <div className={styles.shortcutBlockWrapper}>
                        <ShortcutBlock shortcut={selectedShortcut} selected={true} inputTypesOnClick={handleInputTypeClick} injectVariableLabels={selectedInputs} />
                      </div>
                      <div className={styles.inputTypeWrapper}>
                      {selectedShortcut.inputTypes?.map((inputType: SpotifyActionArgument, index: number) => (
                        <div className={styles.inputTypeWrapper} key={index}>
                          <Heading level={HeadingLevel.HEADING2} color="white">{inputType}</Heading>
                          <div className={styles.shortcutInputVariablesWrapper}>
                            <div className={styles.selected}>
                              <p>{selectedInputs.get(inputType)?.label}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>)
          : <></>
  );
}