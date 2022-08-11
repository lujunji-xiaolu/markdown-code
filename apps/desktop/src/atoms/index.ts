import { atom } from "recoil";

export const anchorPointState = atom<{ x: number; y: number } | null>({
  key: "anchorPoint",
  default: null,
});
