import "@/App.css";
import StoreProvider from "@/features/store-provider";
import { AutoChangeTheme } from "@/features/theme";
import Workbench from "@/pages/workbench/workbench";
import CssBaseline from "@mui/material/CssBaseline";
import { RecoilRoot } from "recoil";
import "./App.css";

function App() {
  return (
    <RecoilRoot>
      <StoreProvider>
        <AutoChangeTheme>
          <CssBaseline />
          <Workbench />
        </AutoChangeTheme>
      </StoreProvider>
    </RecoilRoot>
  );
}

export default App;
