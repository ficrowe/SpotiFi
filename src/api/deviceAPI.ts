import { SpotifyShortcut, SpotifyShortcutType } from "../models/SpotifyShortcut";
import { BASE_URL } from "../constants/apiConstants";
import { Device } from "../models/Device";
import ShortcutMappingRequest from "../models/ShortcutMappingRequest";

const DEVICES_BASE_URL: URL = new URL(BASE_URL + "device/");

/*
export async function saveShortcut(userId: string, deviceId: string, deviceKeyId: string, spotifyShortcut: SpotifyShortcut): Promise<Response | void> {
    interface SpotifyShortcutRequest {
        id: string;
        type: SpotifyShortcutType;
        inputs?: Map<string, string>;
    }

    interface AddDeviceKeyRequest {
        id: string;
        shortcut: SpotifyShortcutRequest;
    }

    const request: AddDeviceKeyRequest = {
        id: deviceKeyId,
        shortcut: {
            id: spotifyShortcut.id,
            type: spotifyShortcut.type,
            inputs: spotifyShortcut.inputs?.toMap()
        }
    }

    const headers = baseHeaders();
    headers.set("Content-Type", "application/json")
    console.log(headers)
    console.log(request)

    await fetch(DEVICES_BASE_URL + deviceId + "/keys", { method: "POST", headers: headers, body: String(request) })
        .then((response: Response) => {
            console.log(response);
        })
        .catch((error: Error) => {
            console.error(error);
        })
}
*/

export async function saveShortcutWithInputs(userId: string, deviceId: string, request: ShortcutMappingRequest): Promise<Response | void> {

    const headers = baseHeaders();
    headers.set("Content-Type", "application/json")
    console.log(JSON.stringify(request))

    await fetch(DEVICES_BASE_URL + deviceId + "/keys", { method: "POST", headers: headers, body: JSON.stringify(request) })
        .then((response: Response) => {
            console.log(response);
        })
        .catch((error: Error) => {
            console.error(error);
        })
}

export async function saveShortcut(userId: string, deviceId: string, request: ShortcutMappingRequest): Promise<Response | void> {

    const headers = baseHeaders();
    headers.set("Content-Type", "application/json")
    console.log("JSON.stringify(request)")
    console.log(JSON.stringify(request))

    await fetch(DEVICES_BASE_URL + deviceId + "/keys", { method: "POST", headers: headers, body: JSON.stringify(request) })
        .then((response: Response) => {
            console.log(response);
        })
        .catch((error: Error) => {
            console.error(error);
        })
}

export async function linkDeviceToUser(userId: string, deviceId: string, deviceName: string): Promise<Response | void> {
    const headers = baseHeaders();
    headers.set("userId", userId);
    console.log(headers.get("userId"))

    return await fetch(DEVICES_BASE_URL + "setup/" + deviceId + "?name=" + deviceName, { method: "GET", headers: headers })
        .then((response: Response) => {
            console.log(response);
        })
        .catch((error: Error) => {
            console.error(error);
        })
}


const baseHeaders = (): Headers => {
    let headers = new Headers();
    headers.append('Access-Control-Allow-Origin', 'http://127.0.0.1:5173/');
    return headers;
}