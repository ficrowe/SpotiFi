import { SpotifyActionArgument } from "./SpotifyAction";
import { SpotifyShortcut, SpotifyShortcutType } from "./SpotifyShortcut";

// type SpotifyShortcutVariableType = keyof typeof SpotifyActionArgument;
// type SpotifyShortcutVariableType = typeof Object.values(SpotifyActionArgument);
// const enumKeys = Object.values(SpotifyActionArgument);
type enumType = keyof typeof SpotifyActionArgument;
type enumKeysType = {[key in enumType]?: string }

export interface SpotifyShortcutVariableRequest extends enumKeysType {
//    [key: SpotifyActionArgument]: string;
}