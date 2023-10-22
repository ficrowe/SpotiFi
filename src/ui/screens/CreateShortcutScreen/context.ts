import { SetStateAction, createContext, useState } from "react";
import { SpotifyAction } from "../../../models/SpotifyAction";
import { ModalState } from "../../components/generic/Modal/Modal";
import { SpotifyShortcutAction } from "../../../models/SpotifyShortcut";

export const initialCreateShortcutContext: CreateShortcutContextProps = {
    shortcutName: "",
    setShortcutName: () => {},
    actions: [],
    setActions: () => {}
}

export interface CreateShortcutContextProps {
    shortcutName: string;
    setShortcutName: React.Dispatch<SetStateAction<string>>;
    actions: Array<SpotifyShortcutAction>;
    setActions: React.Dispatch<SetStateAction<Array<SpotifyShortcutAction>>>;
}

export const CreateShortcutContext = createContext<CreateShortcutContextProps>(initialCreateShortcutContext);