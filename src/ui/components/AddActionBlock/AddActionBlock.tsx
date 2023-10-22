import React, { useContext } from "react";
import { HiPlus } from "react-icons/hi2";
import styles from "./AddActionBlock.module.scss";
import { CreateShortcutContext, CreateShortcutContextProps } from "../../screens/CreateShortcutScreen/context";
import { UndefinedSpotifyAction } from "../../../constants/SpotifyActions";
import { SpotifyShortcutAction } from "../../../models/SpotifyShortcut";

export function AddActionBlock() {
    const { actions, setActions } = useContext<CreateShortcutContextProps>(CreateShortcutContext);

    const addAction = () => {
        setActions([...actions, new SpotifyShortcutAction(UndefinedSpotifyAction.key, UndefinedSpotifyAction.label, UndefinedSpotifyAction.action, actions.length, UndefinedSpotifyAction.inputTypes, UndefinedSpotifyAction.outputTypes)])
    }
    
    return (
      <div className={styles.container} onClick={addAction}>
        <HiPlus size={100} className={styles.plusIcon} />
      </div>
    )
  }