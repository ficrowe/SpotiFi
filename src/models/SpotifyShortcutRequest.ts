import ShortcutMappingRequest from "./ShortcutMappingRequest";
import { SpotifyActionArgument } from "./SpotifyAction";
import { SpotifyShortcut, SpotifyShortcutType, SpotifyShortcutVariable } from "./SpotifyShortcut";
import { SpotifyShortcutInputRequest } from "./SpotifyShortcutInputRequest";
import { SpotifyShortcutVariableRequest } from "./SpotifyShortcutVariableRequest";

export type SpotifyShortcutRequest = SpotifyShortcutWithInputsRequest | SpotifyShortcutWithoutInputsRequest;

export interface SpotifyShortcutWithoutInputsRequest {
    id: string;
    type: SpotifyShortcutType;
}

export class SpotifyShortcutWithInputsRequest {
    id: string;
    type: SpotifyShortcutType;
    inputs: Object;

    constructor(id: string, type: SpotifyShortcutType, inputs: Object) {
        this.id = id;
        this.type = type;
        this.inputs = inputs;
    }
}