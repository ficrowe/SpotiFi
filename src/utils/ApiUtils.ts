import { saveShortcut } from "../api/deviceAPI";
import ShortcutMappingRequest from "../models/ShortcutMappingRequest";
import { SpotifyShortcut, SpotifyShortcutType, SpotifyShortcutVariable } from "../models/SpotifyShortcut";
import { SpotifyShortcutVariableRequest } from "../models/SpotifyShortcutVariableRequest";
import { SpotifyShortcutRequest, SpotifyShortcutWithInputsRequest } from "../models/SpotifyShortcutRequest";
import { SpotifyActionArgument } from "../models/SpotifyAction";
import { SpotifyShortcutInputRequest } from "../models/SpotifyShortcutInputRequest";

export function createShortcutMappingRequest(deviceKeyId: string, shortcutId: string, shortcutType: SpotifyShortcutType): ShortcutMappingRequest {

    const spotifyShortcutRequest: SpotifyShortcutRequest = {
        id: shortcutId,
        type: shortcutType
    }

    const shortcutMappingRequest = new ShortcutMappingRequest(deviceKeyId, spotifyShortcutRequest);
    return shortcutMappingRequest;
}

export function createShortcutMappingRequestWithInputs(deviceKeyId: string, shortcutId: string, shortcutType: SpotifyShortcutType, selectedInputs: Map<SpotifyActionArgument, SpotifyShortcutVariable>): ShortcutMappingRequest {
    const shortcutInputsMap = new Map<string, string>();
    selectedInputs.forEach((input: SpotifyShortcutVariable) => {
        shortcutInputsMap.set(input.type.toLowerCase(), input.value)
    })

    const shortcutInputsObj = Object.fromEntries(shortcutInputsMap.entries());
    const spotifyShortcutRequest: SpotifyShortcutRequest = new SpotifyShortcutWithInputsRequest(shortcutId, shortcutType, shortcutInputsObj);
    const shortcutMappingRequest = new ShortcutMappingRequest(deviceKeyId, spotifyShortcutRequest);
    return shortcutMappingRequest;
    // show macropad with each click of button show napped shortcut + button to execute
    
}