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
import Heading, { HeadingLevel } from "../../../components/Heading/Heading";
import Button from "../../../components/Button/Button";

export default function SelectShortcutInputsContent() { 
  const { selectedShortcut, setSelectedShortcut, selectedInputType, setSelectedInputType, selectedInputs, setSelectedInputs } = useContext<ShortcutContextProps>(ShortcutContext);

  const [validInputVariables, setValidInputVariables] = useState<Map<SpotifyActionArgument, SpotifyShortcutVariable[]>>(new Map());

  useEffect(() => {
    if (selectedInputType && !validInputVariables.has(selectedInputType)) {
      switch (selectedInputType) {
        default:
        case undefined:
          break;
        case SpotifyActionArgument.PLAYLIST:
          getPlaylists().then((playlists: SpotifyPlaylist[] | void) => {
            if (playlists) {
              validInputVariables.set(selectedInputType, playlists)
              setValidInputVariables(new Map(validInputVariables))
            }
          })
          break;
      }
    }
  }, [selectedInputType])

  const handleInputTypeClick = (inputType?: SpotifyActionArgument) => {
    if (selectedInputType == inputType) {
      // setSelectedInputType(undefined);
    } else {
      setSelectedInputType(inputType);
    }
  }

  const handleInputSelect = (inputVariable: SpotifyShortcutVariable) => {
    console.log("selectedInputs", selectedInputs)
    if (selectedInputs.get(inputVariable.type) == inputVariable) {
      selectedInputs.delete(inputVariable.type);
    } else {
      selectedInputs.set(inputVariable.type, inputVariable);
    }
    setSelectedInputs(new Map(selectedInputs))
  }

  return (selectedShortcut != undefined
            ? (<div className={layoutStyles.contentWrapper} key={"selectShortcutInputsContent"}>
                <div className={styles.contentWrapper}>
                  <Text color="white" size={TextSize.LARGE}>Select inputs for your shortcut.</Text>
                  <div className={styles.shortcutInputsWrapper}>
                    <div className={styles.shortcutBlockWrapper}>
                      <ShortcutBlock shortcut={selectedShortcut} selected={true} inputTypesOnClick={handleInputTypeClick} />
                    </div>
                    {selectedShortcut.inputTypes?.map((inputType: SpotifyActionArgument, index: number) => (
                      <div className={styles.inputTypeWrapper} key={index}>
                        <Heading level={HeadingLevel.HEADING2} color="white">{inputType}</Heading>
                        <div className={styles.shortcutInputVariablesWrapper}>
                          {validInputVariables.has(inputType)
                          ? validInputVariables.get(inputType)?.map((inputVariable: SpotifyShortcutVariable, index: number) => (
                            <div onClick={() => handleInputSelect(inputVariable)} key={index} className={selectedInputs.get(inputVariable.type) == inputVariable ? styles.selected : styles.unselected}>
                              <p>{inputVariable.label}</p>
                            </div>
                          ))
                          : <Button extraProps={{ label: "fetch options" }} htmlProps={{ onClick: () => handleInputTypeClick(inputType) }}/>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
            </div>)
          : <></>
  );
}