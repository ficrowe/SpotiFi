import React, { useContext, useState } from "react";
import Header from "../../components/Header/Header";
import Button from "../../components/Button/Button";
import Title from "../../components/Title/Title";
import Layout from "../../components/Layout/Layout";
import TextField from "../../components/TextField/TextField";
import styles from "../../styles/LayoutStyles.module.scss";
import { loginUser } from "../../../firebase/auth";
import { User as FirebaseUser } from "firebase/auth";
import { User } from "../../../models/User";
import { useNavigate } from "react-router-dom";
import { authorise } from "../../../api/spotifyAPI";
import { LoginScreenValidator } from "../../../utils/validationUtils";


export default function LoginScreen() {
  const INITIAL_INPUT_VALUES = {
    // email: "fi.crowe@outlook.com",
    // password: "abc123",
    email: "",
    password: "",
  };

  const [inputValues, setInputValues] = useState(INITIAL_INPUT_VALUES);
  const [showErrorMessages, setShowErrorMessages] = useState(false);
  const navigate = useNavigate();
  const validator: LoginScreenValidator = new LoginScreenValidator();
  
  const attemptLogin = () => {
    loginUser(inputValues.email, inputValues.password).then((firebaseUser?: FirebaseUser) => {
      console.log(firebaseUser)

      if (firebaseUser != undefined) {
        const baseUrl = location.protocol + '//' + location.host + ":" + location.port;
        authorise(baseUrl + "/home")
        // console.log("go to shortcuts")
        // navigate("/shortcuts");
      }
    });
  }

  const updateField = (fieldKey: string, fieldValue: string) => {
    setShowErrorMessages(false)
    inputValues[fieldKey as "email" | "password"] = fieldValue;
    setInputValues({...inputValues})
  }

  const handleLogin = () => {
    const invalid = Object.entries(inputValues).map((input) => 
      validator.validateField(input[0], input[1])
    ).indexOf(false) != -1
    if (!invalid) {
      setShowErrorMessages(false)
      attemptLogin()
    }
    setShowErrorMessages(true)
  }

  return (
    <div className="LoginScreen">
      <Header invertColours={true}>
        <Button
          extraProps={{
            label: "CREATE ACCOUNT",
            invertColours: true,
          }}
          htmlProps={{
            onClick: () => navigate("/register"),
          }}
        />
      </Header>
      <Layout centered={true}>
        <Title>Login</Title>
        <div className={styles.contentWrapper}>
          <div className={styles.inputWrapper}>
            <TextField
              extraProps={{
                label: "Email",
                onChangeCallback: (value: string) => {
                  updateField("email", value)
                },
                shouldValidate: !validator.validateEmailField(inputValues.email) && showErrorMessages,
                errorMessage: validator.getErrorMessageForField("email")
              }}
              htmlProps={{ placeholder: "spotiFi@mail.com" }}
            />
            <TextField
              extraProps={{
                label: "Password",
                onChangeCallback: (value: string) => {
                  updateField("password", value)
                },
                shouldValidate: !validator.validatePasswordField(inputValues.password) && showErrorMessages,
                errorMessage: validator.getErrorMessageForField("password"),
                link: "Forgot Password",
                linkOnClick: () => navigate("/reset-password"),
              }}
              htmlProps={{
                placeholder: "**********",
                type: "password",
              }}
            />
            <Button
              extraProps={{
                label: "LOGIN",
                primary: true,
              }}
              htmlProps={{
                onClick: handleLogin,
              }}
            />
          </div>
        </div>
      </Layout>
    </div>
  );
}