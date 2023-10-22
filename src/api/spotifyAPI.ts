import { SpotifyPlaylist, SpotifyPlaylists } from "../models/SpotifyPlaylist";
import { BASE_URL } from "../constants/apiConstants";
import { SpotifyActionArgument } from "../models/SpotifyAction";
import { SpotifyShortcut, SpotifyShortcutVariable } from "../models/SpotifyShortcut";

const SPOTIFY_AUTH_BASE_URL: URL = new URL(BASE_URL + "spotify/authentication");
const SPOTIFY_BASE_URL: URL = new URL(BASE_URL + "spotify");

export async function authorise(redirectUrl: string | undefined) {
    const endpoint: string = "/authorise"
    console.log(redirectUrl);
    if (redirectUrl != undefined) {
        endpoint + "/redirect?redirectUrl=" + redirectUrl;
    }
    return fetch(SPOTIFY_AUTH_BASE_URL + endpoint, { /*mode: "no-cors",*/ redirect: "manual" })
        .then((response: Response) => {
            console.log(response);
            // window.open(response.url, '_blank')?.focus();
            window.location.href = response.url;
        })
        .catch((error: Error) => {
            console.error(error);
        })
}

export async function getPlaylists(): Promise<SpotifyPlaylist[] | void> {
    interface SpotifyPlaylistResponse {
        id: string;
        name: string;
    }

    const response = await fetch(SPOTIFY_BASE_URL + "/playlists", { /*mode: "no-cors"*/ })
    if (response.ok) {
        const json = await response.json();
        const playlistResponse: Array<SpotifyPlaylistResponse> = JSON.parse(JSON.stringify(json));
        return playlistResponse.map((playlist: SpotifyPlaylistResponse) => new SpotifyPlaylist(playlist.name, playlist.id))
    }
    else if (response.status == 401) {
        console.log(response)
        await authorise(window.location.href);
        // return getPlaylists();
    }
    console.error(response)
}

// export async function getPlaylistById(playlistId: string): Promise<SpotifyPlaylist | void> {
//     interface SpotifyPlaylistResponse {
//         id: string;
//         name: string;
//     }

//     const response = await fetch(SPOTIFY_BASE_URL + "/playlists/" + playlistId, { /*mode: "no-cors"*/ })
//     if (response.ok) {
//         const json = await response.json();
//         const playlistResponse: SpotifyPlaylistResponse = JSON.parse(JSON.stringify(json));
//         const playlist: SpotifyPlaylist = new SpotifyPlaylist(playlistResponse.name, playlistResponse.id)
//         return playlist;
//     }
//     else if (response.status == 401) {
//         console.log(response)
//         await authorise(window.location.href);
//         // return getPlaylists();
//     }
//     console.error(response)
// }