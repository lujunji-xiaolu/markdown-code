import { atom } from "recoil";

export const expandedIdsState = atom<Set<number>>({
  key: "tree-view-expandedIds",
  default: new Set(),
});

export const selectedIdsState = atom<Set<number>>({
  key: "tree-view-selectedIdsState",
  default: new Set(),
});

export const focusedIdState = atom<number | null>({
  key: "tree-view-focusedId",
  default: null,
});
