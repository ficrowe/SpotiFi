import React, { useContext } from "react";
import Header from "../../components/Header/Header";
import Button from "../../components/Button/Button";
import Layout from "../../components/Layout/Layout";
import Title from "../../components/Title/Title";
import layoutStyles from "../../styles/LayoutStyles.module.scss";
import styles from "./CreateShortcutScreen.module.scss";
import Text, { TextSize } from "../../components/Text/Text";
import ActionBuilder from "../../components/ActionBuilder/ActionBuilder";
import { CreateShortcutContext, CreateShortcutContextProps } from "./context";
import TextField from "../../components/TextField/TextField";
import Heading, { HeadingLevel } from "../../components/Heading/Heading";
import { ModalState } from "../../components/generic/Modal/Modal";

export default function CreateShortcutScreen() {
  const { shortcutName, setShortcutName, actions, setActions } = useContext<CreateShortcutContextProps>(CreateShortcutContext);

  return (
    <div className={styles.container}>
      <Header invertColours={true} />
      <Layout centered={true} color="dimGray">
          <div className={styles.titleSectionWrapper}>

            <Title>
              <div className={styles.title}>
                Create
                <br />
                Shortcut
              </div>
            </Title>
            <Text color="white" size={TextSize.LARGE}>Using simple actions performed on Spotify as building blocks, create a shortcut to save time executing repeated actions.</Text>
          </div>
          <div className={layoutStyles.contentWrapper}>
            <div className={styles.nameField}>
              <TextField extraProps={{ label: "Name of Shortcut", onChangeCallback: (value: string) => setShortcutName(value) }} htmlProps={{ value: shortcutName }} />
            </div>
            <div className={styles.contentWrapper}>
              <div className={styles.actionsWrapper}>
                <ActionBuilder />
              </div>

            </div>
            <div className={styles.buttonsWrapper}>
                <Button extraProps={{ label: "Back" }}/>
                <Button extraProps={{ label: "Next" }}/>
              </div>
        </div>
      </Layout>
    </div>
  );
}
