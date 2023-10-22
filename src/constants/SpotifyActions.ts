import { SpotifyAction, SpotifyActionArgument, SpotifyActionType } from "../models/SpotifyAction";

/** UNDEFINED **/
export const UndefinedSpotifyAction: SpotifyAction = {
    key: SpotifyActionType.UNDEFINED,
    label: "Select an Action...",
    action: () => console.log("UndefinedSpotifyAction"),
}

/** GET CURRENT TRACK **/
export const GetCurrentTrack: SpotifyAction = {
    key: SpotifyActionType.GET_CURRENT_TRACK,
    label: "Get currently playing track",
    action: () => console.log("GetCurrentTrack"),
    outputTypes: [SpotifyActionArgument.SONG]
}

/** ADD TO PLAYLIST **/
export const AddToPlaylist: SpotifyAction = {
    key: SpotifyActionType.ADD_TO_PLAYLIST,
    label: "Add track to playlist",
    action: () => console.log("AddToPlaylist"),
    inputTypes: [SpotifyActionArgument.SONG, SpotifyActionArgument.PLAYLIST],
}

/** REMOVE FROM PLAYLIST **/
export const RemoveFromPlaylist: SpotifyAction = {
    key: SpotifyActionType.REMOVE_FROM_PLAYLIST,
    label: "Remove track from playlist",
    action: () => console.log("RemoveFromPlaylist"),
    inputTypes: [SpotifyActionArgument.SONG, SpotifyActionArgument.PLAYLIST],
}

/** PAUSE/PLAY **/
export const PausePlay: SpotifyAction = {
    key: SpotifyActionType.PAUSE_PLAY,
    label: "Pause/Play",
    action: () => console.log("Pause/Play"),
}

/** NEXT TRACK **/
export const NextTrack: SpotifyAction = {
    key: SpotifyActionType.NEXT_TRACK,
    label: "Next track",
    action: () => console.log("NextTrack"),
}

/** PREVIOUS TRACK **/
export const PreviousTrack: SpotifyAction = {
    key: SpotifyActionType.PREVIOUS_TRACK,
    label: "Previous track",
    action: () => console.log("PreviousTrack"),
}


export const spotifyActions: Array<SpotifyAction> = [
    // UndefinedSpotifyAction,
    GetCurrentTrack,
    AddToPlaylist,
    RemoveFromPlaylist,
    PausePlay,
    NextTrack,
    PreviousTrack
]

export const getActionFromKey = (actionKey: string): SpotifyAction => {
    switch (actionKey) {
      case SpotifyActionType.GET_CURRENT_TRACK.toString():
        return GetCurrentTrack;
      case SpotifyActionType.ADD_TO_PLAYLIST.toString():
        return AddToPlaylist;
      case SpotifyActionType.REMOVE_FROM_PLAYLIST.toString():
        return RemoveFromPlaylist;
      case SpotifyActionType.PAUSE_PLAY.toString():
        return PausePlay;
      case SpotifyActionType.NEXT_TRACK.toString():
        return NextTrack;
      case SpotifyActionType.PREVIOUS_TRACK.toString():
        return PreviousTrack;
      default:
      case SpotifyActionType.UNDEFINED.toString():
        return UndefinedSpotifyAction;
    }
  }
