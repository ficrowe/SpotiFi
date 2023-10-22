import React, { useContext, useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Layout from "../../components/Layout/Layout";
import Title from "../../components/Title/Title";
import layoutStyles from "../../styles/LayoutStyles.module.scss";
import styles from "./HomeScreen.module.scss";
import Card from "../../components/Card/Card";
import Heading, { HeadingLevel } from "../../components/Heading/Heading";
import { ApplicationContextProps, ApplicationContext } from "../../../context/ApplicationContext/context";
import { Device } from "../../../models/Device";
import { getUserDevices } from "../../../api/userAPI";
import useAuthListener from "../../../firebase/AuthListener";
import { AddDeviceBlock } from "../../components/AddDeviceBlock/AddDeviceBlock";
import { DeviceBlock } from "../../components/DeviceBlock/DeviceBlock";
import LightningLoader from "../../components/LightningLoader/LightningLoader";

export default function HomeScreen() {
  const { user } = useAuthListener();
  const { devices, setDevices, loading, setLoading } = useContext<ApplicationContextProps>(ApplicationContext);

  const refreshUserDevices = () => {
    setLoading(true)
    if (user != undefined) {
      getUserDevices(user.id)
        .then((userDevices: Array<Device> | void) => {
          if (userDevices != undefined) {
            console.log("userDevices", userDevices)
            setDevices(userDevices)
          }
        })
        .catch((error: Error) => {
          console.error(error)
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }

  useEffect(() => {
    refreshUserDevices()
  }, [])
  
  const titleStyle1: React.CSSProperties = {
    textAlign: "start",
    color: "#0BDA51"
  }

  const titleStyle2: React.CSSProperties = {
    textAlign: "start",
    color: "white"
  }

  const handleAddDevice = () => {
    refreshUserDevices()
  }

  return (
    <div className={styles.container}>
      <Header invertColours={true} />
      <Layout centered={true} color="dimGray">
            <Title>
              <div style={titleStyle1}>Spotify</div>
              <div style={titleStyle2}>Shortcuts</div>
            </Title>
            <div className={layoutStyles.contentWrapper}>
              <Heading color="white" level={HeadingLevel.HEADING1}>Devices</Heading>
              {loading
                  ? (<div className={styles.loaderWrapper}>
                      <div className={styles.loader}>
                        <LightningLoader strokeColour="#6de997" />
                      </div>
                    </div>)
                  : (<>
                    {devices.map((device: Device, index: number) => (
                      <DeviceBlock device={device} key={index} />
                    ))}
                    <AddDeviceBlock onDeviceAdd={handleAddDevice} />
                  </>)
              }
          </div>
      </Layout>
    </div>
  );
}
