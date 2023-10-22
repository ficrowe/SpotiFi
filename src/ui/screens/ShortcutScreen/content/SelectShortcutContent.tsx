import React, { useContext } from "react";
import layoutStyles from "../../../styles/LayoutStyles.module.scss";
import styles from "../ShortcutScreen.module.scss";
import Text, { TextSize } from "../../../components/Text/Text";
import { spotifyShortcuts } from "../../../../constants/SpotifyShortcuts";
import { SpotifyShortcut } from "../../../../models/SpotifyShortcut";
import ShortcutBlock from "../../../components/ShortcutBlock/ShortcutBlock";
import { ShortcutContext, ShortcutContextProps } from "../context";

export default function SelectShortcutContent() { 
  const { selectedShortcut, setSelectedShortcut } = useContext<ShortcutContextProps>(ShortcutContext);
 
  const handleShortcutClick = (clickedShortcut: SpotifyShortcut) => {
    if (selectedShortcut != clickedShortcut) {
      setSelectedShortcut(clickedShortcut)
    } else {
      setSelectedShortcut(undefined)
    }
  }

  return (
          <div className={layoutStyles.contentWrapper} key={"selectShortcutContent"}>
            <div className={styles.contentWrapper}>
              <Text color="white" size={TextSize.LARGE}>Select a shortcut to run when you press the key.</Text>
              <div className={styles.shortcutsWrapper}>
              {spotifyShortcuts.map((spotifyShortcut: SpotifyShortcut, index: number) => 
                <div className={styles.shortcutBlockWrapper} key={index}>
                  <ShortcutBlock shortcut={spotifyShortcut} selected={spotifyShortcut == selectedShortcut} onClick={() => handleShortcutClick(spotifyShortcut)}/>
                </div>
              )}
              </div>
            </div>
        </div>
  );
}