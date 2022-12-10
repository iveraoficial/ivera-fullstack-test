import { createContext } from "react";
import Client from "./Client";

export interface IAppContext {
    client: Client;
}

const AppContext = createContext<IAppContext | null>(null);

export default AppContext;