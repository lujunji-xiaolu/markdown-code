import { StoreContext } from "@/features/store-provider";
import * as React from "react";

export default function useStore() {
  return React.useContext(StoreContext);
}
