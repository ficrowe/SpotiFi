import { SpotifyActionArgument } from "../models/SpotifyAction"
import { SpotifyShortcut, SpotifyShortcutType } from "../models/SpotifyShortcut"

/** GET CURRENT TRACK AND ADD TO A PLAYLIST **/
export const AddCurrentTrackToPlaylist: SpotifyShortcut = 
    new SpotifyShortcut("AddCurrentTrackToPlaylist",
    "Add currently playing track to playlist",
    SpotifyShortcutType.ADD_CURRENT_TRACK_TO_PLAYLIST,
    [SpotifyActionArgument.PLAYLIST])

/** GET CURRENT TRACK AND REMOVE FROM A PLAYLIST **/
export const RemoveCurrentTrackFromPlaylist: SpotifyShortcut = 
new SpotifyShortcut("RemoveCurrentTrackFromPlaylist",
"Remove currently playing track from playlist",
SpotifyShortcutType.REMOVE_CURRENT_TRACK_FROM_PLAYLIST,
[SpotifyActionArgument.PLAYLIST])

/** PAUSE **/
export const Pause: SpotifyShortcut = new SpotifyShortcut("Pause",
"Pause music",
SpotifyShortcutType.PAUSE)

/** PLAY **/
export const Play: SpotifyShortcut = new SpotifyShortcut("Play",
"Play music",
SpotifyShortcutType.PLAY)

/** NEXT TRACK **/
export const NextTrack: SpotifyShortcut = new SpotifyShortcut("NextTrack",
"Skip to the next track",
SpotifyShortcutType.NEXT)


/** PREVIOUS TRACK **/
export const PreviousTrack: SpotifyShortcut = new SpotifyShortcut("PreviousTrack",
"Back to the previous track",
SpotifyShortcutType.PREVIOUS)


export const spotifyShortcuts: Array<SpotifyShortcut> = [
    AddCurrentTrackToPlaylist,
    RemoveCurrentTrackFromPlaylist,
    Pause,
    Play,
    NextTrack,
    PreviousTrack
]

export function getShortcutOfType(type: SpotifyShortcutType) {
    switch (type) {
        case SpotifyShortcutType.ADD_CURRENT_TRACK_TO_PLAYLIST:
            return AddCurrentTrackToPlaylist
        case SpotifyShortcutType.REMOVE_CURRENT_TRACK_FROM_PLAYLIST:
            return RemoveCurrentTrackFromPlaylist
        case SpotifyShortcutType.PAUSE:
            return Pause
        case SpotifyShortcutType.PLAY:
            return Play
        case SpotifyShortcutType.NEXT:
            return NextTrack
        case SpotifyShortcutType.PREVIOUS:
            return PreviousTrack
    }
}