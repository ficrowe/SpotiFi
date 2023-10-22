import { DeviceType } from "../models/DeviceType";
import { Device } from "../models/Device";
import Macropad from "../ui/components/Macropad/Macropad";
import { SpotifyShortcutType } from "../models/SpotifyShortcut";

export function getDeviceComponent(device: Device, disabled: boolean = false) {
    let deviceComponent: React.ReactNode;
    switch (device.type) {
        default:
        case DeviceType.MACROPAD:
            deviceComponent = <Macropad keys={device.keys} disabled={disabled} />
    }
    return deviceComponent;
}

