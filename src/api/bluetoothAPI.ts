/// <reference types="web-bluetooth" />
import React from "react";

export const connect = async () => {
  const device = await navigator.bluetooth.requestDevice({
    acceptAllDevices: true,
  });
  const server = await device.gatt?.connect();

  console.log(device);
  console.log(server);
};
