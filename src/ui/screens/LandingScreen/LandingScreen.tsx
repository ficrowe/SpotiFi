import React, { useContext, useEffect } from "react";
import Header from "../../components/Header/Header";
import Button from "../../components/Button/Button";
import Layout from "../../components/Layout/Layout";
import Title from "../../components/Title/Title";
import layoutStyles from "../../styles/LayoutStyles.module.scss";
import styles from "./LandingScreen.module.scss";
import Text, { TextSize } from "../../components/Text/Text";
import LightningLoader from "../../components/LightningLoader/LightningLoader";

export default function LandingScreen() {
    
  const titleStyle1: React.CSSProperties = {
    textAlign: "start",
    color: "#0BDA51"
  }

  const titleStyle2: React.CSSProperties = {
    textAlign: "start",
    color: "white"
  }

  return (
    <div className={styles.container}>
      <Header invertColours={true}>
      </Header>
      <Layout centered={true}>
          <div className={styles.titleSectionWrapper}>
          <Title>
              <div style={titleStyle1}>SpotiFi</div>
              <div style={titleStyle2}>Shortcuts</div>
            </Title>
            <div className={styles.loaderWrapper}>
            <LightningLoader strokeColour="#6de997" />
          </div>
          </div>
          <div className={styles.tagLineWrapper}>
            <Text color="white" size={TextSize.LARGE}>The simple but powerful music macropad, giving users the ability to automate and customise their Spotify experience.</Text>
          </div>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
      </Layout>
    </div>
  );
}