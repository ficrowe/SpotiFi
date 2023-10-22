import React, { useState } from "react";
import Header from "../../components/Header/Header";
import Button from "../../components/Button/Button";
import Layout from "../../components/Layout/Layout";
import Title from "../../components/Title/Title";
import styles from "../../styles/LayoutStyles.module.scss";
import TextField from "../../components/TextField/TextField";
import { registerUser } from "../../../firebase/auth";
import { useNavigate } from "react-router-dom";
import { RegisterScreenValidator } from "../../../utils/validationUtils";

export default function RegisterScreen() {
  const INITIAL_INPUT_VALUES = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };

  const [inputValues, setInputValues] = useState(INITIAL_INPUT_VALUES);
  const [showErrorMessages, setShowErrorMessages] = useState(false);
  const navigate = useNavigate();
  const validator: RegisterScreenValidator = new RegisterScreenValidator();

  const attemptRegister = () => {
    registerUser(inputValues.email, inputValues.password, { firstName: inputValues.firstName, lastName: inputValues.lastName })
  }

  const handleCreateAccount = () => {
    const invalid = Object.entries(inputValues).map((input) => 
        validator.validateField(input[0], input[1])
      ).indexOf(false) != -1
    if (!invalid) {
      setShowErrorMessages(false)
      attemptRegister()
    }
    setShowErrorMessages(true)
  }

  const updateField = (fieldKey: string, fieldValue: string) => {
    setShowErrorMessages(false)
    inputValues[fieldKey as "email" | "password" | "firstName" | "lastName"] = fieldValue;
    setInputValues({...inputValues})
  }

  return (
    <div className="RegisterScreen">
      <Header invertColours={true}>
        <Button
          extraProps={{
            label: "LOGIN",
            invertColours: true,
          }}
          htmlProps={{
            onClick: () => navigate("/login"),
          }}
        />
      </Header>
      <Layout centered={true}>
        <Title>Create Account</Title>
        <div className={styles.contentWrapper}>
          <div className={styles.inputWrapper}>
            <TextField
              extraProps={{
                label: "First Name",
                onChangeCallback: (value: string) => {
                  updateField("firstName", value)
                },
                shouldValidate: !validator.validateFirstNameField(inputValues.firstName) && showErrorMessages,
                errorMessage: validator.getErrorMessageForField("firstName")
              }}
              htmlProps={{ placeholder: "Jane" }}
            />
            <TextField
              extraProps={{
                label: "Last Name",
                onChangeCallback: (value: string) => {
                  updateField("lastName", value)
                },
                shouldValidate: !validator.validateLastNameField(inputValues.lastName) && showErrorMessages,
                errorMessage: validator.getErrorMessageForField("lastName")
              }}
              htmlProps={{ placeholder: "Doe" }}
            />
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
                errorMessage: validator.getErrorMessageForField("password")
              }}
              htmlProps={{
                placeholder: "**********",
                type: "password",
              }}
            />
            <Button
              extraProps={{
                label: "CREATE ACCOUNT",
                primary: true
              }}
              htmlProps={{
                onClick: handleCreateAccount
              }}
            />
          </div>
        </div>
      </Layout>
    </div>
  );
}
