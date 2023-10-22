import { SpotifyActionArgument, SpotifyActionType } from "./SpotifyAction";
import { SpotifyShortcutVariable, SpotifyShortcutVariables } from "./SpotifyShortcut";


export interface SpotifyPlaylists {
  href: string;
  items: SpotifyPlaylist[];
}

export class SpotifyPlaylist extends SpotifyShortcutVariable {

  // label: string;
  // value: string;

  constructor(label: string, value: string) {
    super(label, value, SpotifyActionArgument.PLAYLIST);
    // this.label = label;
    // this.value = value;
  }
}
