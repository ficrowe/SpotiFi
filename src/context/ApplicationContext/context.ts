import { SetStateAction, createContext } from "react";
import { Device } from "../../models/Device";

export const initialApplicationContext: ApplicationContextProps = {
    devices: [],
    setDevices: () => {},
    loading: false,
    setLoading: () => {}
}

export interface ApplicationContextProps {
    devices: Array<Device>;
    setDevices: React.Dispatch<SetStateAction<Array<Device>>>;
    loading: boolean;
    setLoading: React.Dispatch<SetStateAction<boolean>>;
}

export const ApplicationContext = createContext<ApplicationContextProps>(initialApplicationContext);