import React, { useContext } from "react";
import { ShortcutContext } from "../ui/screens/ShortcutScreen/context";
import { ShortcutContextProps } from "../ui/screens/ShortcutScreen/context";
import { Device } from "../models/Device";
import useAuthListener from "../firebase/AuthListener";
import { getDevice } from "../api/userAPI";
import { useNavigate } from "react-router-dom";

export function setLocalState(key: string, value: string) {
    console.log("setting local store item " + key + " to " + value)
    localStorage.setItem(key, value);
}


export function getLocalState(key: string): string | undefined {
    console.log("getting local store item " + key)
    return localStorage.getItem(key) ?? undefined;
}