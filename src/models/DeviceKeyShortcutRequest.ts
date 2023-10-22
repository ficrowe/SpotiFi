import { SpotifyShortcut } from "./SpotifyShortcut";
import SpotifyShortcutRequest from "./SpotifyShortcutRequest";

export default class ShortcutMappingRequest {
    private deviceId: string;
    private deviceKeyId: string;
    private shortcut: SpotifyShortcutRequest;

    constructor(deviceId: string, deviceKeyId: string, shortcut: SpotifyShortcutRequest) {
        this.deviceId = deviceId;
        this.deviceKeyId = deviceKeyId;
        this.shortcut = shortcut;
    }
}