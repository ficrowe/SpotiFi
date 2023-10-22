export enum SpotifyActionType {
    UNDEFINED,
    GET_CURRENT_TRACK,
    ADD_TO_PLAYLIST,
    REMOVE_FROM_PLAYLIST,
    PAUSE_PLAY,
    NEXT_TRACK,
    PREVIOUS_TRACK
}

export enum SpotifyActionArgument {
    SONG = "Song",
    PLAYLIST = "Playlist"
}

export interface SpotifyAction {
    key: SpotifyActionType;
    label: string;
    inputTypes?: Array<SpotifyActionArgument>
    // inputs?: Array<SpotifyShortcutVariable>
    outputTypes?: Array<SpotifyActionArgument>
    // outputs?: Array<SpotifyShortcutVariable>
    action: () => any;
}

export class SpotifyActionVariables extends Array<SpotifyActionVariable> {

    getVariableTypes(): Array<SpotifyActionArgument> {
        return this.map((variable: SpotifyActionVariable) => variable.type);
    }

    setVariable(variable: SpotifyActionVariable) {
        const variableIndex: number = this.getVariableTypes().indexOf(variable.type);

        if (variableIndex == -1) {
            this.push(variable);
        } else {
            this[variableIndex] = variable;
        }
    }
}

export class SpotifyActionVariable {
    label: string;
    actionIndex: number;
    type: SpotifyActionArgument;
    
    constructor(actionIndex: number, type: SpotifyActionArgument) {
        this.label = type + actionIndex;
        this.actionIndex = actionIndex;
        this.type = type;
    }
}