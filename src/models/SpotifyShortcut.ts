import { SpotifyAction, SpotifyActionArgument, SpotifyActionType, SpotifyActionVariable, SpotifyActionVariables } from "./SpotifyAction";

export enum SpotifyShortcutType {
    ADD_CURRENT_TRACK_TO_PLAYLIST = "ADD_CURRENT_TRACK_TO_PLAYLIST",
    REMOVE_CURRENT_TRACK_FROM_PLAYLIST = "REMOVE_CURRENT_TRACK_FROM_PLAYLIST",
    PAUSE = "PAUSE",
    PLAY = "PLAY",
    NEXT = "NEXT",
    PREVIOUS = "PREVIOUS"
}

export function getDisplayNameForType(type: SpotifyShortcutType) {
    switch (type) {
        case SpotifyShortcutType.ADD_CURRENT_TRACK_TO_PLAYLIST:
            return "Add currently playing track to playlist"
        case SpotifyShortcutType.REMOVE_CURRENT_TRACK_FROM_PLAYLIST:
            return "Remove currently playing track from playlist"
        case SpotifyShortcutType.PAUSE:
            return "Pause music"
        case SpotifyShortcutType.PLAY:
            return "Play music"
        case SpotifyShortcutType.NEXT:
            return "Skip to the next track"
        case SpotifyShortcutType.PREVIOUS:
            return "Back to the previous track"
    }
}

export class SpotifyShortcut {
    id: string;
    displayName: string;
    type: SpotifyShortcutType;
    inputTypes?: Array<SpotifyActionArgument>;
    inputs?: SpotifyShortcutVariables;

    constructor(id: string, displayName: string, type: SpotifyShortcutType, inputTypes?: Array<SpotifyActionArgument>) {
        this.id = id;
        this.displayName = displayName;
        this.type = type;
        this.inputTypes = inputTypes;
    }

    setInput(inputVariable: SpotifyShortcutVariable) {
        if (this.inputs == undefined) {
            this.inputs = new SpotifyShortcutVariables();
        }
        this.inputs.setVariable(inputVariable);
    }
}

export class SpotifyShortcutAction implements SpotifyAction {
    key: SpotifyActionType;
    label: string;
    inputTypes?: Array<SpotifyActionArgument>;
    outputTypes?: Array<SpotifyActionArgument>;
    action: () => any;

    index: number;
    inputs?: SpotifyActionVariables;
    outputs?: SpotifyActionVariables;
    
    constructor(key: SpotifyActionType, label: string, action: () => any, index: number, inputTypes?: SpotifyActionArgument[], outputTypes?: SpotifyActionArgument[]) {
        this.key = key;
        this.label = label;
        this.inputTypes = inputTypes;
        this.outputTypes = outputTypes;
        this.action = action;

        this.index = index;
    }

    setInputVariable(inputVariable: SpotifyActionVariable) {
        if (this.inputs == undefined) {
            this.inputs = new SpotifyActionVariables();
        }
        this.inputs.setVariable(inputVariable);
    }

    setOutputVariable(outputVariable: SpotifyActionVariable) {
        if (this.outputs == undefined) {
            this.outputs = new SpotifyActionVariables();
        }
        this.outputs.setVariable(outputVariable);
    }
}

export class SpotifyShortcutVariables extends Array<SpotifyShortcutVariable> {

    getVariableTypes(): Array<SpotifyActionArgument> {
        return this.map((variable: SpotifyShortcutVariable) => variable.type);
    }

    setVariable(variable: SpotifyShortcutVariable) {
        const variableIndex: number = this.getVariableTypes().indexOf(variable.type);

        if (variableIndex == -1) {
            this.push(variable);
        } else {
            this[variableIndex] = variable;
        }
    }

    toMap(): Map<string, string> {
        const shortcutVariablesMap: Map<string, string> = new Map();
        this.forEach((variable: SpotifyShortcutVariable) => { 
            shortcutVariablesMap.set(variable.type, variable.value)
        })
        return shortcutVariablesMap;
    }

    getVariable(type: SpotifyActionArgument): SpotifyShortcutVariable | undefined {
        return this.find((variable) => variable.type == type)
    }
}

export class SpotifyShortcutVariable {
    label: string;
    value: string;
    type: SpotifyActionArgument;
    
    constructor(label: string, value: string, type: SpotifyActionArgument) {
        this.label = label;
        this.value = value;
        this.type = type;
    }
}