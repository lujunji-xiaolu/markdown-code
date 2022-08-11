import { atom } from "recoil";
import { Dir } from "../features/explorer";

export const rootDirState = atom<Dir | null>({
  key: "rootDir",
  default: null,
});
