import React, { useContext, useEffect } from "react";
import Header from "../../components/Header/Header";
import Button from "../../components/Button/Button";
import Layout from "../../components/Layout/Layout";
import Title from "../../components/Title/Title";
import layoutStyles from "../../styles/LayoutStyles.module.scss";
import styles from "./ShortcutScreen.module.scss";
import Text, { TextSize } from "../../components/Text/Text";
import { ShortcutContext, ShortcutContextProps } from "./context";
import { HeadingLevel } from "../../../ui/components/Heading/Heading";
import Heading from "../../../ui/components/Heading/Heading";
import { useNavigate } from "react-router-dom";
import SelectKeyContent from "./content/SelectKeyContent";
import SelectShortcutContent from "./content/SelectShortcutContent";
import SelectShortcutInputsContent from "./content/SelectShortcutInputsContent";
import useAuthListener from "../../../firebase/AuthListener";
import { logoutUser } from "../../../firebase/auth";
import { connect } from "../../../api/bluetoothAPI";
import BarLoader from "../../components/BarLoader/BarLoader";
import LightningLoader from "../../components/LightningLoader/LightningLoader";
import ConfirmShortcutContent from "./content/ConfirmShortcutContent";
import { getLocalState, setLocalState } from "../../../utils/StateUtils";
import { getDevice } from "../../../api/userAPI";
import { Device } from "../../../models/Device";
import SpotifyShortcutRequest from "../../../models/SpotifyShortcutRequest";
import ShortcutMappingRequest from "../../../models/ShortcutMappingRequest";
import { SpotifyShortcutVariableRequest } from "../../../models/SpotifyShortcutVariableRequest";
import { saveShortcut } from "../../../api/deviceAPI";
import { SpotifyShortcutVariable } from "../../../models/SpotifyShortcut";
import { SpotifyActionArgument } from "../../../models/SpotifyAction";
import { createShortcutMappingRequest, createShortcutMappingRequestWithInputs } from "../../../utils/ApiUtils";
import { assert } from "console";


export enum ShortcutStep {
  SELECT_KEY,
  SELECT_SHORTCUT,
  SELECT_SHORTCUT_INPUTS,
  CONFIRM
}

export default function ShortcutScreen() {
  const { user } = useAuthListener();
  const { shortcutStep, setShortcutStep, selectedShortcut, setSelectedShortcut, selectedInputs, setSelectedInputs, selectedDevice, setSelectedDevice, selectedDeviceKey, setSelectedDeviceKey } = useContext<ShortcutContextProps>(ShortcutContext);
  const navigate = useNavigate();

  const resetShortcutState = () => {
    setSelectedShortcut(undefined);
    setSelectedInputs(new Map());
    setSelectedDeviceKey(undefined);
    setShortcutStep(ShortcutStep.SELECT_KEY);
  }


const intialiseState = () => {
  const selectedDeviceId = getLocalState("selectedDevice");
  if (user != undefined && selectedDeviceId != undefined) {
      getDevice(user.id, selectedDeviceId)
      .then((device: Device | void) => {
          device && setSelectedDevice(device)
          setLocalState("selectedDevice", selectedDeviceId)
      })
      .catch((error: Error) => {
          console.error(error)
          navigate("/home")
      })
  }
}

useEffect(() => {
  intialiseState()
}, [])

  const handleBackClick = () => {
    console.log("back click")
    setShortcutStep(shortcutStep - 1);
  }

  const handleNextClick = () => {
    console.log("next click")
    console.log("shortcutStep", shortcutStep)

    const apiRequestGuard = (): ShortcutMappingRequest | undefined => {
      if (user != undefined
        && selectedDevice != undefined
        && selectedDeviceKey != undefined 
        && selectedShortcut != undefined) {
          const inputTypes = selectedShortcut.inputTypes;
          if (inputTypes != undefined && inputTypes.length > 0) {
            if (selectedInputs != undefined) {
              return createShortcutMappingRequestWithInputs(String(selectedDeviceKey.id), selectedShortcut.id, selectedShortcut.type, selectedInputs)
            }
          } else {
            return createShortcutMappingRequest(String(selectedDeviceKey.id), selectedShortcut.id, selectedShortcut.type)
          }
      } else {
        console.error("Cannot create a shortcut mapping request")
      }
    }

    if (shortcutStep == ShortcutStep.CONFIRM) {
      const shortcutMappingRequest = apiRequestGuard();
      if (shortcutMappingRequest != undefined && user != undefined && selectedDevice != undefined) {
        saveShortcut(user.id, selectedDevice.id, shortcutMappingRequest)
          .then((response: Response | void) => {
            console.log(response)
          })
          .catch((error: Error) => console.error(error))
          .finally(() => {
            resetShortcutState();
            navigate("/home")
          })
      }
    }

    let nextShortcutStep: ShortcutStep = shortcutStep + 1;
    console.log("nextShortcutStep", nextShortcutStep)

    if (selectedShortcut != undefined && selectedShortcut.inputTypes == undefined && nextShortcutStep == ShortcutStep.SELECT_SHORTCUT_INPUTS) {
      nextShortcutStep += 1;
      console.log("nextShortcutStep", nextShortcutStep)
    }
    if (nextShortcutStep <= ShortcutStep.CONFIRM) {
      console.log("setShortcutStep", nextShortcutStep)
      setShortcutStep(nextShortcutStep);
    }
  }
  
  const handleLogout = () => {
    logoutUser();
    navigate("/login")
  }

  const getShortcutContent = (): React.ReactNode => {
    switch(shortcutStep) {
      case ShortcutStep.SELECT_KEY:
        return <SelectKeyContent />;
      case ShortcutStep.SELECT_SHORTCUT:
        return <SelectShortcutContent />;
      case ShortcutStep.SELECT_SHORTCUT_INPUTS:
        return <SelectShortcutInputsContent />;
      case ShortcutStep.CONFIRM:
        return <ConfirmShortcutContent />;
    }
  }

  return (
    <div className={styles.container}>
      <Header invertColours={true}>
        {/* <Text color={"white"}>{user?.firstName + " " + user?.lastName}</Text> */}
        <Button extraProps={{ label: "LOGOUT" }} htmlProps={{ onClick: handleLogout }}/>
      </Header>
      <Layout centered={true}>
          <div className={styles.titleSectionWrapper}>
            <Title>
              <div className={styles.title}>
                Spotify
                <br />
                Shortcuts
              </div>
            </Title>
            <Text color="white" size={TextSize.LARGE}>Map Spotify shortcuts to the keys on your macropad.</Text>
          </div>
          <div className={layoutStyles.contentWrapper}>
            {getShortcutContent()}
          </div>
          <div className={styles.buttonsWrapper}>
            {shortcutStep > ShortcutStep.SELECT_KEY && <Button extraProps={{ label: "Back", neutral: true }} htmlProps={{ onClick: handleBackClick }}/>}
            <Button extraProps={{ label: shortcutStep < ShortcutStep.CONFIRM ? "Next" : "Confirm" }} htmlProps={{ onClick: handleNextClick }}/>
          </div>
      </Layout>
    </div>
  );
}