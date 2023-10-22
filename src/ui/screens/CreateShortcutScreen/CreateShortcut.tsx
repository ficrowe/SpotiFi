import React, { useContext, useState } from "react";
import { CreateShortcutContext, initialCreateShortcutContext } from "./context";
import CreateShortcutScreen from "./CreateShortcutScreen";

export default function CreateShortcut() {
  const [shortcutName, setShortcutName] = useState(initialCreateShortcutContext.shortcutName);
  const [actions, setActions] = useState(initialCreateShortcutContext.actions);

  const createShortcutContextValue = {
        shortcutName: shortcutName,
        setShortcutName: setShortcutName,
        actions: actions,
        setActions: setActions
  }

  return (
    <CreateShortcutContext.Provider value={createShortcutContextValue}>
      <CreateShortcutScreen />
    </CreateShortcutContext.Provider>
  );
}
