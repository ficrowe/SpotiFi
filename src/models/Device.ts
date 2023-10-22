import { DeviceType } from "./DeviceType";
import { SpotifyShortcut } from "./SpotifyShortcut";
import Macropad from "../ui/components/Macropad/Macropad";

export class DeviceKey {
    id: number;
    shortcut?: SpotifyShortcut;

    constructor(id: number) {
        this.id = id;
    }

    setShortcut(shortcut: SpotifyShortcut) {
        this.shortcut = shortcut;
    }
}

export class Device {
    id: string;
    name: string;
    type: DeviceType;
    keys: Array<DeviceKey>

    constructor(id: string, name: string, type: DeviceType, keys: Array<DeviceKey>) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.keys = keys;
    }
}