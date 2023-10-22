import React, { useContext, useEffect } from "react";
import Header from "../../components/Header/Header";
import Layout from "../../components/Layout/Layout";
import Title from "../../components/Title/Title";
import layoutStyles from "../../styles/LayoutStyles.module.scss";
import styles from "./HomeScreen.module.scss";
import Card from "../../components/Card/Card";
import Heading, { HeadingLevel } from "../../components/Heading/Heading";
import useAuthListener from "../../../firebase/AuthListener";
import { Device } from "../../../models/Device";
import { ApplicationContextProps } from "../../../context/ApplicationContext/context";
import { ApplicationContext } from "../../../context/ApplicationContext/context";
import { getUserDevices } from "../../../api/userAPI";

export default function SetupDeviceScreen() {
  const { user } = useAuthListener();
  const { devices, setDevices } = useContext<ApplicationContextProps>(ApplicationContext);

  const titleStyle1: React.CSSProperties = {
    textAlign: "start",
    color: "#0BDA51"
  }

  const titleStyle2: React.CSSProperties = {
    textAlign: "start",
    color: "white"
  }

  const cardStyle: React.CSSProperties = {
    backgroundColor: "#e7feef",
  }

  const shortcutCardStyle: React.CSSProperties = {
    backgroundColor: "#06792d",
    maxWidth: "15rem",
    textAlign: "start"
  }

  // useEffect(() => {
  //   getUserDevices(user?.id)
  //     .then((userDevices: Array<Device>) => {
  //       console.log(userDevices)
  //       setDevices(userDevices)
  //     })
  //     .catch((error: Error) => {
  //       console.error(error)
  //     })
  // }, [user])

  return (
    <div className="SetupDeviceScreen">
      <Header invertColours={true} />
      <Layout centered={true} color="dimGray">
            <Title>
              <div style={titleStyle1}>Spotify</div>
              <div style={titleStyle2}>Shortcuts</div>
            </Title>
            <div className={layoutStyles.contentWrapper}>
              <Card style={cardStyle}>
                <div className={styles.cardHeader}>
                  <Heading level={HeadingLevel.HEADING2}>Devices</Heading>
                </div>
                <div className={styles.cardContent}>
                  {devices.map((device: Device) => (
                    <Card style={shortcutCardStyle}>
                      <Heading color="white" level={HeadingLevel.HEADING3}>{device.name}</Heading>
                    </Card>
                  ))}
                </div>
              </Card>
          </div>
      </Layout>
    </div>
  );
}
