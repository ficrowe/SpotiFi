import { SetStateAction, createContext, useState } from "react";
import { SpotifyAction, SpotifyActionArgument } from "../../../models/SpotifyAction";
import { ModalState } from "../../components/generic/Modal/Modal";
import { SpotifyShortcut, SpotifyShortcutAction, SpotifyShortcutVariable } from "../../../models/SpotifyShortcut";
import { Device, DeviceKey } from "../../../models/Device";
import { ShortcutStep } from "./ShortcutScreen";

export const initialShortcutContext: ShortcutContextProps = {
    shortcutStep: ShortcutStep.SELECT_KEY,
    setShortcutStep: () => {},
    selectedDevice: undefined,
    setSelectedDevice: () => {},
    selectedShortcut: undefined,
    setSelectedShortcut: () => {},
    selectedDeviceKey: undefined,
    setSelectedDeviceKey: () => {},
    selectedInputType: undefined,
    setSelectedInputType: () => {},
    selectedInputs: new Map(),
    setSelectedInputs: () => {}
}

export interface ShortcutContextProps {
    shortcutStep: ShortcutStep;
    setShortcutStep: React.Dispatch<SetStateAction<ShortcutStep>>;
    selectedDevice: Device | undefined;
    setSelectedDevice: React.Dispatch<SetStateAction<Device | undefined>>;
    selectedShortcut: SpotifyShortcut | undefined;
    setSelectedShortcut: React.Dispatch<SetStateAction<SpotifyShortcut | undefined>>;
    selectedDeviceKey: DeviceKey | undefined;
    setSelectedDeviceKey: React.Dispatch<SetStateAction<DeviceKey | undefined>>;
    selectedInputType: SpotifyActionArgument | undefined;
    setSelectedInputType: React.Dispatch<SpotifyActionArgument | undefined>;
    selectedInputs: Map<SpotifyActionArgument, SpotifyShortcutVariable>;
    setSelectedInputs: React.Dispatch<Map<SpotifyActionArgument, SpotifyShortcutVariable>>;
}

export const ShortcutContext = createContext<ShortcutContextProps>(initialShortcutContext);