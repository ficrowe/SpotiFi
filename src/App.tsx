import React, { useContext, useEffect } from "react";
import "./App.scss";
import { Route, Routes, useNavigate } from "react-router-dom";
import LandingScreen from "./ui/screens/LandingScreen/LandingScreen";
import LoginScreen from "./ui/screens/LoginScreen/LoginScreen";
import RegisterScreen from "./ui/screens/RegisterScreen/RegisterScreen";
import HomeScreen from "./ui/screens/HomeScreen/HomeScreen";
import CreateShortcut from "./ui/screens/CreateShortcutScreen/CreateShortcut";
import ShortcutContextProvider from "./ui/screens/ShortcutScreen/ShortcutContextProvider";
import useAuthListener from "./firebase/AuthListener";
import { connect } from "./api/bluetoothAPI";
import ApplicationContextProvider from "./context/ApplicationContext/ApplicationContextProvider";
export const BASE_URI = "localhost:3000";

export default function App() {
  const { user } = useAuthListener();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(user)
    if (!(window.location.href.endsWith("/register") || window.location.href.endsWith("/login"))) {
      if (user == undefined) {
        console.log("please login")
        navigate("/login")
      }
    } else {
      if (user != undefined) {
        navigate("/shortcuts")
      }
    }
  }, [user])

  return (
    <div className="App">
      <Routes>
        <Route key={0} path="/" element={<LandingScreen />}></Route>
        <Route key={1} path="/login" element={<LoginScreen />}></Route>
        <Route key={2} path="/register" element={<RegisterScreen />}></Route>
        <Route key={3} path="/home" element={<ShortcutContextProvider><HomeContextProvider /></ShortcutContextProvider>}></Route>
        <Route key={4} path="/shortcuts" element={<ShortcutContextProvider />}></Route>
        <Route key={5} path="/shortcuts/create" element={<CreateShortcut />}></Route>
        {/* <Route path="/shortcuts/edit" element={<CreateShortcutScreen />}></Route> */}
      </Routes>
    </div>
  );
}

function HomeContextProvider() {
  return (
    <ApplicationContextProvider>
      <HomeScreen />
    </ApplicationContextProvider>
  )
}
