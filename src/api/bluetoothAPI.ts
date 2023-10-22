/// <reference types="web-bluetooth" />
import React from "react";

export const connect = async () => {
    const device = await navigator.bluetooth.requestDevice({ acceptAllDevices: true });
    const server = await device.gatt?.connect();

    console.log(device);
    console.log(server);
      
    // Philips Hue Light Control Service
    // const service = await server.getPrimaryService(
    //   "932c32bd-0000-47a2-835a-a8d455b859dd"
    // );
  };