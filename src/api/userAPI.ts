import { getShortcutOfType } from "../constants/SpotifyShortcuts";
import { BASE_URL } from "../constants/apiConstants";
import { Device, DeviceKey } from "../models/Device";
import { SpotifyActionArgument } from "../models/SpotifyAction";
import { SpotifyPlaylist, SpotifyPlaylists } from "../models/SpotifyPlaylist";
import { SpotifyShortcut, SpotifyShortcutVariable, getDisplayNameForType } from "../models/SpotifyShortcut";
import { getPlaylists } from "./spotifyAPI";

const USER_BASE_URL: URL = new URL(BASE_URL + "user/");

export async function getUserDevices(userId: string): Promise<Array<Device> | void> {
    let headers = new Headers();
    headers.append('Access-Control-Allow-Origin', 'http://127.0.0.1:5173/');

    const response: Response = await fetch(USER_BASE_URL + userId + "/devices", { method: "GET", headers: headers })
    const json = await response.json();
    const devicesResponse: Object[] = JSON.parse(JSON.stringify(json));
    const devices: Array<Device> = devicesResponse.map((deviceObj: any) => {
        const deviceKeys: Array<DeviceKey> = deviceObj.keys.map((key: any) => {
            console.log(key)
            console.log(key.shortcut)

            const deviceKey =  new DeviceKey(key.id)
            const shortcut = key.shortcut;
            if (shortcut != undefined) {
                const spotifyShortcut: SpotifyShortcut = getShortcutOfType(shortcut.type);
                console.log(spotifyShortcut)

                const shortcutInputs = key.shortcut.inputs;

                if (shortcutInputs != undefined) {
                    const shortcutInputEntries = Object.entries(shortcutInputs);

                    shortcutInputEntries.map((entry) => {
                        const inputKey: SpotifyActionArgument = SpotifyActionArgument[entry[0].toUpperCase() as keyof typeof SpotifyActionArgument];
                        const inputValue: string = entry[1] as string;
    
                        const inputOptions: SpotifyPlaylist[] = [];
                        getPlaylists()
                            .then((playlists: SpotifyPlaylist[] | void) => {
                                playlists && inputOptions.push(...playlists)
                            })
                            .finally(() => {
                                const inputOptionsFiltered = inputOptions.filter((option) => option.value.match(inputValue))
                                const inputOption = inputOptionsFiltered?.at(0)
                                const inputLabel = inputOption?.label
            
                                console.log("inputOptions", inputOptions)
                                console.log("inputOption", inputOption)
                                console.log(inputValue, inputOption)
                                if (inputLabel != undefined) {
                                    const shortcutVariable = new SpotifyShortcutVariable(inputLabel, inputValue, inputKey)
                                    spotifyShortcut.setInput(shortcutVariable)
                                }
                            });
                        // const inputOption = inputOptions.find((option) => option.value == inputValue)
    
                        
                    })
                }
            
                deviceKey.setShortcut(spotifyShortcut)
            }
            return deviceKey
        });
        const device = new Device(deviceObj.id, deviceObj.name, deviceObj.type, deviceKeys)

        return device;
    })
    return devices;
}

export async function getDevice(userId: string, deviceId: string): Promise<Device | void> {
    const headers = baseHeaders();
    
    const response = await fetch(USER_BASE_URL + userId + "/device/" + deviceId, { method: "GET", headers: headers })
    if (response.ok) {
        const json = await response.json();
        console.log(json)

        const deviceResponse: Device = JSON.parse(JSON.stringify(json));
        console.log(deviceResponse)

        return deviceResponse;
    } else {
        console.error("Unable to get device");
    }
}

const baseHeaders = (): Headers => {
    let headers = new Headers();
    headers.append('Access-Control-Allow-Origin', 'http://127.0.0.1:5173/');
    return headers;
}