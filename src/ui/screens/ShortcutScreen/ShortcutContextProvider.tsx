import React, { useContext, useState } from "react";
import { ShortcutContext } from "./context";
import ShortcutScreen, { ShortcutStep } from "./ShortcutScreen";
import { Device, DeviceKey } from "../../../models/Device";
import { SpotifyShortcut, SpotifyShortcutVariable } from "../../../models/SpotifyShortcut";
import { SpotifyActionArgument } from "../../../models/SpotifyAction";
import ApplicationContextProvider from "../../../context/ApplicationContext/ApplicationContextProvider";

interface ShortcutContextProviderProps {
  children?: React.ReactNode;
}

export default function ShortcutContextProvider(props: ShortcutContextProviderProps) {
  const [shortcutStep, setShortcutStep] = useState<ShortcutStep>(ShortcutStep.SELECT_KEY);
  const [selectedDevice, setSelectedDevice] = useState<Device | undefined>(undefined);
  const [selectedShortcut, setSelectedShortcut] = useState<SpotifyShortcut | undefined>(undefined);
  const [selectedDeviceKey, setSelectedDeviceKey] = useState<DeviceKey | undefined>(undefined);
  const [selectedInputType, setSelectedInputType] = useState<SpotifyActionArgument | undefined>(undefined);
  const [selectedInputs, setSelectedInputs] = useState<Map<SpotifyActionArgument, SpotifyShortcutVariable>>(new Map());
  
  const shortcutContextValue = {
    shortcutStep: shortcutStep,
    setShortcutStep: setShortcutStep,
    selectedDevice: selectedDevice,
    setSelectedDevice: setSelectedDevice,
    selectedShortcut: selectedShortcut,
    setSelectedShortcut: setSelectedShortcut,
    selectedDeviceKey: selectedDeviceKey,
    setSelectedDeviceKey: setSelectedDeviceKey,
    selectedInputType: selectedInputType,
    setSelectedInputType: setSelectedInputType,
    selectedInputs: selectedInputs,
    setSelectedInputs: setSelectedInputs
  }

  return (
    <ApplicationContextProvider>
      <ShortcutContext.Provider value={shortcutContextValue}>
        {props.children
        ? props.children
        : <ShortcutScreen />}
      </ShortcutContext.Provider>
    </ApplicationContextProvider>
  );
}
