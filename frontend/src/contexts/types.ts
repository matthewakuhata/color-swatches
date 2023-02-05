import { Colors } from "../types";

export type SwatchAction =
  | SwatchLockAction
  | SwatchUnlockAction
  | SwatchUpdateAction;
export type SwatchLockAction = { type: "lock"; id: string };
export type SwatchUnlockAction = { type: "unlock"; id: string };
export type SwatchUpdateAction = {
  type: "update";
  newSwatches: Colors[];
};

export type SwatchDispatch = (action: SwatchAction) => void;

export type LockOrderSwatch = Colors & { locked: boolean; ordering: number };
export type SwatchesMap = { [key: string]: LockOrderSwatch };
export type SwatchState = {
  total: number;
  lockedSwatches: number;
  swatches: SwatchesMap;
};

export type SwatchProviderProps = {
  children: React.ReactNode;
  defaultValues?: Partial<SwatchState>;
};
