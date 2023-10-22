import React, { useContext, useState } from "react";
import styles from "./ActionBuilder.module.scss";
import { SpotifyAction, SpotifyActionArgument, SpotifyActionType } from "../../../models/SpotifyAction";
import Heading, { HeadingLevel } from "../Heading/Heading";
import ActionBlock from "../ActionBlock/ActionBlock";
import { UndefinedSpotifyAction, getActionFromKey, spotifyActions } from "../../../constants/SpotifyActions";
import DropDownList from "../DropDownList/DropDownList";
import { DropDownOption } from "../DropDownItem/DropDownItem";
import { CreateShortcutContext, CreateShortcutContextProps } from "../../screens/CreateShortcutScreen/context";
import { AddActionBlock } from "../AddActionBlock/AddActionBlock";
import Text, { TextSize } from "../Text/Text";
import Modal, { ModalState } from "../generic/Modal/Modal";
import { SpotifyShortcutAction } from "../../../models/SpotifyShortcut";

export default function ActionBuilder() {
  const { actions, setActions } = useContext<CreateShortcutContextProps>(CreateShortcutContext);

  const getValidActionList = (index: number): SpotifyAction[] => {
    if (index == 0) return spotifyActions;
    
    const previousAction = getActionFromKey(actions[index - 1].key.toString());

    return spotifyActions.filter((spotifyAction: SpotifyAction) => {
      spotifyAction.inputTypes?.every((actionArgument: SpotifyActionArgument) =>
        previousAction.outputTypes?.includes(actionArgument)
      )
    })
  }

  return (
    <section>
      <div className={styles.container}>
      <div className={styles.actionsWrapper}>
        {actions.map((spotifyAction: SpotifyShortcutAction, index: number) => 
          <ActionBlock key={index} actionIndex={index} actionList={getValidActionList(index)} action={spotifyAction} setAction={(updatedAction: SpotifyShortcutAction) => {
            actions[index] = updatedAction;
            setActions([...actions]);
          }} />
        )}
        {/* <AddActionBlock /> */}
        {actions.at(actions.length - 1) != UndefinedSpotifyAction && <AddActionBlock />}
        </div>
        <ShortcutVariables />
      </div>
    </section>
  );
}

function ShortcutVariables() {
  const { actions } = useContext<CreateShortcutContextProps>(CreateShortcutContext);

  return (
          <div className={styles.variablesWrapper}>
          <div className={styles.variablesHeadingWrapper}>
            <Heading level={HeadingLevel.HEADING2}>Variables</Heading>
            <div className={styles.variableSubheading}>
              <Text size={TextSize.SMALL}>The outputs from the actions will appear here as variables, to use as inputs for other actions.</Text>
            </div>
          </div>
          <div className={styles.variablesList}>
            {actions.map((action: SpotifyAction) => action.outputTypes)}
          </div>
        </div>
  )
}
