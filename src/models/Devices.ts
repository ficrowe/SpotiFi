import { Device, DeviceKey } from "./Device";

const deviceKeys: Array<DeviceKey> = [
    new DeviceKey(0),
    new DeviceKey(1),
    new DeviceKey(2),
    new DeviceKey(3),
]
export const device: Device = new Device(1, deviceKeys);