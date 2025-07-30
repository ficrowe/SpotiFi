import React, { useContext, useState } from "react";
import styles from "./ActionBlock.module.scss";
import {
  SpotifyAction,
  SpotifyActionArgument,
  SpotifyActionType,
  SpotifyActionVariable,
  SpotifyActionVariables,
} from "../../../models/SpotifyAction";
import DropDownList from "../DropDownList/DropDownList";
import { getActionFromKey } from "../../../constants/SpotifyActions";
import { DropDownOption } from "../DropDownItem/DropDownItem";
import {
  CreateShortcutContextProps,
  CreateShortcutContext,
} from "../../screens/CreateShortcutScreen/context";
import { SpotifyShortcutAction } from "../../../models/SpotifyShortcut";

export interface ActionBlockProps {
  actionList: SpotifyAction[];
  action: SpotifyShortcutAction;
  setAction: (updatedAction: SpotifyShortcutAction) => void;
  actionIndex: number;
}

export default function ActionBlock(props: ActionBlockProps) {
  const { actions } = useContext<CreateShortcutContextProps>(
    CreateShortcutContext
  );
  const { actionList, action, setAction, actionIndex } = props;
  const [inputVariables, setInputVariables] = useState<SpotifyActionVariables>(
    new SpotifyActionVariables()
  );

  const spotifyActionDropdownList: DropDownOption[] = actionList.map(
    (spotifyAction): DropDownOption => ({
      label: spotifyAction.label,
      value: spotifyAction.key.toString(),
    })
  );

  const validInputVariables: SpotifyActionVariable[] = actions
    .filter(
      (spotifyShortcutAction: SpotifyShortcutAction) =>
        spotifyShortcutAction.index < actionIndex
    )
    .flatMap(
      (spotifyShortcutAction: SpotifyShortcutAction) =>
        spotifyShortcutAction.outputs as SpotifyActionVariables
    )
    .map(
      (shortcutVariable: SpotifyActionVariable | undefined) =>
        shortcutVariable as SpotifyActionVariable
    );

  const validInputVariablesForType = (
    variableType: SpotifyActionArgument
  ): SpotifyActionVariable[] => {
    return validInputVariables.filter(
      (inputVariable: SpotifyActionVariable) =>
        inputVariable?.type == variableType
    );
  };

  const inputVariablesAsDropdownList = (
    inputVariables: SpotifyActionVariable[]
  ): DropDownOption[] =>
    inputVariables.map((shortcutVariable: SpotifyActionVariable) => ({
      label: shortcutVariable?.label,
      value: shortcutVariable?.label,
    }));

  const updateAction = (updatedAction: SpotifyShortcutAction) => {
    setAction(updatedAction);
  };

  const handleActionDropdownSelect = (option: string) => {
    const selectedAction: SpotifyAction = getActionFromKey(option);
    setAction(
      new SpotifyShortcutAction(
        selectedAction.key,
        selectedAction.label,
        selectedAction.action,
        actionIndex,
        selectedAction.inputTypes,
        selectedAction.outputTypes
      )
    );
  };

  const handleInputDropdownSelect = (option: string) => {
    const selectedInputVariable: SpotifyActionVariable = validInputVariables
      .filter(
        (inputVariable: SpotifyActionVariable) => inputVariable.label == option
      )
      .at(0) as SpotifyActionVariable;

    inputVariables.setVariable(selectedInputVariable);
    setInputVariables(inputVariables);
  };

  const getStyleForAction = () => {
    if (action.inputTypes) {
      return styles.actionWithInputs;
    }
    return styles.action;
  };

  const getSelectedActionOption = (): string | undefined => {
    if (action.key == SpotifyActionType.UNDEFINED) {
      return undefined;
    }
    return action.key.toString();
  };

  const getUndefinedInputTypes = (): Array<SpotifyActionArgument> => {
    const definedInputTypes: Array<SpotifyActionArgument> =
      action.inputs?.map((input: SpotifyActionVariable) => input.type) ?? [];
    const undefinedInputTypes =
      action.inputTypes?.filter(
        (inputType: SpotifyActionArgument) =>
          !definedInputTypes.includes(inputType)
      ) ?? [];
    return undefinedInputTypes;
  };

  const getSelectedInputOption = (inputType: SpotifyActionArgument): string => {
    const selectedInputVariable: SpotifyActionVariable = inputVariables.find(
      (inputVariable: SpotifyActionVariable) => inputVariable.type == inputType
    ) as SpotifyActionVariable;
    return selectedInputVariable.label;
  };

  return (
    <div className={styles.container}>
      <div className={styles.actionDropdown}>
        <DropDownList
          extraProps={{
            label: "Spotify Action",
            onChangeCallback: handleActionDropdownSelect,
            options: spotifyActionDropdownList,
            selectedOption: getSelectedActionOption(),
          }}
        />
      </div>
      <div className={styles.argumentsWrapper}>
        <div className={styles.inputWrapper}>
          {action.inputTypes && <p>Select your inputs</p>}

          {action.inputTypes?.map(
            (inputType: SpotifyActionArgument, index: number) => (
              <DropDownList
                extraProps={{
                  label: `${inputType} Input Variable`,
                  onChangeCallback: handleInputDropdownSelect,
                  options: inputVariablesAsDropdownList(
                    validInputVariablesForType(inputType)
                  ),
                  selectedOption: getSelectedInputOption(inputType),
                }}
              />
            )
          )}

          {inputVariables.map((input: SpotifyActionVariable) => (
            <div className={styles.input}>{input.label}</div>
          ))}
          {getUndefinedInputTypes().map((inputType: SpotifyActionArgument) => (
            <div className={styles.undefinedInput}>{inputType}</div>
          ))}
        </div>

        <div className={styles.outputWrapper}>
          {action.outputTypes && <p>Variables</p>}
          {action.outputTypes?.map((outputType: SpotifyActionArgument) => (
            <div className={styles.output}>{outputType}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
