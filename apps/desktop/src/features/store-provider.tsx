import * as React from "react";
import { Store } from "tauri-plugin-store-api";

// @ts-ignore
export const StoreContext = React.createContext<Store>(null);

export default function StoreProvider(props: { children: React.ReactNode }) {
  const store = React.useMemo(() => new Store("settings.json"), []);

  return (
    <StoreContext.Provider value={store}>
      {props.children}
    </StoreContext.Provider>
  );
}
