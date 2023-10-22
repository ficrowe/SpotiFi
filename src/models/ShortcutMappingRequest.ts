import { SpotifyShortcut } from "./SpotifyShortcut";
import { SpotifyShortcutRequest } from "./SpotifyShortcutRequest";

export default class ShortcutMappingRequest {
    id: string;
    shortcut: SpotifyShortcutRequest;

    constructor(id: string, shortcut: SpotifyShortcutRequest) {
        this.id = id;
        this.shortcut = shortcut;
    }
}