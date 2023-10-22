import React, { ReactNode, useContext, useState } from "react";
import styles from "./ShortcutBlock.module.scss";
import { SpotifyAction, SpotifyActionArgument, SpotifyActionType, SpotifyActionVariable, SpotifyActionVariables } from "../../../models/SpotifyAction";
import Heading, { HeadingLevel } from "../Heading/Heading";
import Text from "../Text/Text";
import DropDownList from "../DropDownList/DropDownList";
import { AddToPlaylist, GetCurrentTrack, NextTrack, PausePlay, PreviousTrack, RemoveFromPlaylist, UndefinedSpotifyAction, getActionFromKey, spotifyActions } from "../../../constants/SpotifyActions";
import { DropDownOption } from "../DropDownItem/DropDownItem";
import { CreateShortcutContextProps, CreateShortcutContext } from "../../screens/CreateShortcutScreen/context";
import Button from "../Button/Button";
import { SpotifyShortcut, SpotifyShortcutAction, SpotifyShortcutVariable, SpotifyShortcutVariables } from "../../../models/SpotifyShortcut";
import { spotifyShortcuts } from "../../../constants/SpotifyShortcuts";
import { getPlaylists } from "../../../api/spotifyAPI";

// const spotifyActionDropdownList: DropDownOption[] = (
//   spotifyActions.map((spotifyAction): DropDownOption => (
//     {
//       label: spotifyAction.label,
//       value: spotifyAction.key.toString()
//     }
//   ))
// )

export interface ShortcutBlockProps {
  shortcut: SpotifyShortcut;
  selected?: boolean;
  onClick?: () => void;
  inputTypesOnClick?: (inputType: SpotifyActionArgument) => void;
  injectVariableLabels?: Map<SpotifyActionArgument, SpotifyShortcutVariable>
}

export default function ShortcutBlock(props: ShortcutBlockProps) {
  const { shortcut, selected, onClick } = props;
  
  const handleInputClick = (inputType: SpotifyActionArgument) => {
    // shortcut.inputs?.find((input: SpotifyShortcutVariable) => input.type == inputType)
    props.inputTypesOnClick && props.inputTypesOnClick(inputType);
  }

  const shortcutContent = (): React.ReactNode => {

    interface InputTypePosition {
      type: SpotifyActionArgument;
      position: number;
    }

    let shortcutContent: React.ReactNode = <div className={styles.shortcutStaticText}>{shortcut.displayName}</div>
    if (shortcut.inputTypes != undefined) {
      const inputTypesPosition: Array<InputTypePosition> = shortcut.inputTypes?.map((inputType: SpotifyActionArgument) => {
        return {
          type: inputType,
          position: shortcut.displayName.indexOf(inputType.toLowerCase())
        } as InputTypePosition
      })

      shortcutContent = (
        inputTypesPosition.map((inputTypePosition: InputTypePosition, index: number) => {
          let startIndex: number = 0;

          if (index != 0) {
            const previousInputTypePosition = inputTypesPosition[index - 1];
            startIndex = previousInputTypePosition.position + previousInputTypePosition.type.length;
          }

          return (
              <div key={index}>{shortcut.displayName.substring(startIndex, inputTypePosition.position)}
                <span className={selected ? styles.selectedShortcutInputText : styles.unselectedShortcutInputText} onClick={() => handleInputClick(inputTypePosition.type)}>
                  {inputTypePosition.type}
                  </span>
              </div>
          )
        })
      )
    }
    
    return (
      <div>
        {shortcutContent}
      </div>
    )
  }
  
  return (
    <div className={selected ? styles.selectedContainer : styles.unselectedContainer} onClick={onClick}>
      {shortcutContent()}
    </div>
  );
}
