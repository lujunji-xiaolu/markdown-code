import "@/App.css";
import StoreProvider from "@/features/store-provider";
import { AutoChangeTheme } from "@/features/theme";
import Workbench from "@/pages/workbench/workbench";
import CssBaseline from "@mui/material/CssBaseline";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import "./App.css";

class StyleIsolation extends HTMLElement {
  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: "open" });

    shadowRoot.innerHTML = `
      <style>
        :host {
          all: initial;
        }
      </style>

      <slot></slot>
    `;
  }
}

customElements.define("style-isolation", StyleIsolation);

function App() {
  return (
    <RecoilRoot>
      <StoreProvider>
        <AutoChangeTheme>
          <CssBaseline />
          <MemoryRouter>
            <Routes>
              <Route path="/" element={<Workbench />}></Route>
            </Routes>
          </MemoryRouter>
        </AutoChangeTheme>
      </StoreProvider>
    </RecoilRoot>
  );
}

export default App;
