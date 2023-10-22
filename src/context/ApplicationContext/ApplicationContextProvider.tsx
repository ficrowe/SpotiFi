import React, { useState } from "react";
import { ApplicationContext, initialApplicationContext } from "./context";
import { Device } from "../../models/Device";

interface ApplicationContextProviderProps {
  children: React.ReactNode;
}

export default function ApplicationContextProvider({ children }: ApplicationContextProviderProps) {
  const [devices, setDevices] = useState<Array<Device>>(initialApplicationContext.devices);
  const [loading, setLoading] = useState<boolean>(initialApplicationContext.loading);
  
  const applicationContextValue = {
    devices: devices,
    setDevices: setDevices,
    loading: loading,
    setLoading: setLoading
  }

  return (
    <ApplicationContext.Provider value={applicationContextValue}>
      {children}
    </ApplicationContext.Provider>
  );
}
