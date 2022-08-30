import StoreProvider from "@/features/store-provider";
import ThemeProvider from "@/features/theme-provider";
import Workbench from "@/pages/workbench/workbench";
import CssBaseline from "@mui/material/CssBaseline";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <RecoilRoot>
      <StoreProvider>
        <ThemeProvider>
          <CssBaseline />
          <Workbench />
        </ThemeProvider>
      </StoreProvider>
    </RecoilRoot>
  );
}

export default App;
