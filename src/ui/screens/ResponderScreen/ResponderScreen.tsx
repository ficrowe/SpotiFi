import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Button from "../../components/Button/Button";
import Title from "../../components/Title/Title";
import Layout from "../../components/Layout/Layout";
import styles from "../../styles/LayoutStyles.module.scss";
import DropDownList from "../../components/DropDownList/DropDownList";
import { DropDownOption } from "../../components/DropDownItem/DropDownItem";
import TextBox from "../../components/TextBox/TextBox";
import Heading, { HeadingLevel } from "../../components/Heading/Heading";
import Section from "../../components/Section/Section";
import Text from "../../components/Text/Text";
import RadioGroup from "../../components/RadioGroup/RadioGroup";
import { RadioButtonItem } from "../../components/RadioButton/RadioButton";
import { Axis } from "../../../constants/styleConstants";
import { TbMoodSad, TbMoodSmile } from "react-icons/tb";
import AccountDropDownList from "../../components/AccountDropDownList/AccountDropDownList";
import screenStyles from "../../styles/ScreenStyles.module.scss";

const toneOptions: DropDownOption[] = [
  {
    label: "Professional",
    value: "P",
  },
  {
    label: "Neutral",
    value: "N",
  },
  {
    label: "Casual",
    value: "C",
  },
];

const feedbackIconOptions: RadioButtonItem[] = [
  {
    icon: TbMoodSmile,
    value: "good",
    checked: true,
  },
  {
    icon: TbMoodSad,
    value: "bad",
    checked: false,
  },
];

export default function ResponderScreen() {
  const INITIAL_INPUT_VALUES = new Map([
    ["tone", undefined as string | undefined],
    ["prompt", ""],
    ["response", ""],
    ["feedback", undefined as string | undefined],
  ]);

  const DEFAULT_HEADING_LEVEL = HeadingLevel.HEADING2;

  const [inputValues, setInputValues] =
    useState<Map<string, string | undefined>>(INITIAL_INPUT_VALUES);

  const handleInputChange = (key: string, value: string) => {
    const newInputValues = new Map(inputValues.set(key, value));
    setInputValues(newInputValues);
  };

  return (
    <div className={screenStyles.background}>
      <Header invertColours={true}>
        <AccountDropDownList
          extraProps={{
            name: "Ziggy",
          }}
        />
      </Header>
      <Layout centered={true} color={"white"}>
        <Title>ComposeAI</Title>
        <div className={`${styles.contentWrapper} ${styles.center}`}>
          <Section>
            <Heading
              level={DEFAULT_HEADING_LEVEL}
            >STEP 1 - CHOOSE YOUR TONE</Heading>
            <Text>
              Select the tone which you would like the response to be written
              in.
            </Text>
            <DropDownList
              extraProps={{
                label: "Tone",
                selectedOption: inputValues.get("tone"),
                onChangeCallback: (option: string) =>
                  handleInputChange("tone", option),
                options: toneOptions,
              }}
            />
          </Section>
          <Section>
            <Heading
              level={DEFAULT_HEADING_LEVEL}
            >STEP 2 - ENTER PROMPT</Heading>
            <Text>
              Write brief instructions for what you would like your response to
              be, and/or copy & paste the email you are replying to.
            </Text>
            <TextBox
              extraProps={{
                label: "Prompt",
                onChangeCallback: (value: string) =>
                  handleInputChange("prompt", value),
                link: "Clear",
                linkOnClick: () => console.log("clear"),
              }}
              htmlProps={{ value: inputValues.get("prompt") ?? "" }}
              // instructions={"Write brief instructions for what you would like your response to be, and/or copy & paste the email you are replying to."}
            />
          </Section>
          <Section>
            <Heading
              level={DEFAULT_HEADING_LEVEL}
            >STEP 3 - GENERATE YOUR RESPONSE</Heading>
            <Button
              extraProps={{ label: "GENERATE RESPONSE", primary: true }}
            />
          </Section>
          <Section>
            <Heading
              level={DEFAULT_HEADING_LEVEL}
            >STEP 4 - COPY RESPONSE</Heading>
            <TextBox
              extraProps={{
                label: "Response",
                onChangeCallback: (value: string) =>
                  handleInputChange("response", value),
                topRightContent: (
                  <RadioGroup
                    label={"How did we do?"}
                    options={feedbackIconOptions}
                    layout={Axis.HORIZONTAL}
                    onChangeCallback={(value: string) =>
                      handleInputChange("feedback", value)
                    }
                    selectedOption={inputValues.get("feedback")}
                  />
                ),
              }}
              htmlProps={{ value: inputValues.get("response") ?? "" }}
            />
            <div className={`${styles.row} ${styles.verticalPadding}`}>
              <Button extraProps={{ label: "TRY AGAIN" }} />
              <Button
                extraProps={{ label: "COPY TO CLIPBOARD", primary: true }}
              />
            </div>
          </Section>
        </div>
      </Layout>
    </div>
  );
}
