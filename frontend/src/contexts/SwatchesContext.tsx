import { createContext, useContext, useEffect, useReducer } from "react";
import { Colors } from "../types";
import axios from "axios";
import {
  SwatchAction,
  SwatchDispatch,
  SwatchProviderProps,
  SwatchState,
} from "./types";
import { lockReducer, unlockReducer, updateReducer } from "./reducers";

const SwitchStateContext = createContext<
  { state: SwatchState; dispatch: SwatchDispatch } | undefined
>(undefined);

function swatchReducer(state: SwatchState, action: SwatchAction) {
  switch (action.type) {
    case "lock":
      return lockReducer(state, action);
    case "unlock":
      return unlockReducer(state, action);
    case "update":
      return updateReducer(state, action);
    default:
      return state;
  }
}

async function fetchSwatches(dispatch: SwatchDispatch, limit: number) {
  const { data }: { data: Colors[] } = await axios.get("/api/v1/color", {
    params: { limit },
  });

  dispatch({ type: "update", newSwatches: data });
}

const SwatchProvider = ({ children, defaultValues }: SwatchProviderProps) => {
  const [state, dispatch] = useReducer(swatchReducer, {
    total: defaultValues?.total ?? 0,
    lockedSwatches: defaultValues?.lockedSwatches ?? 0,
    swatches: defaultValues?.swatches ?? {},
  });

  useEffect(() => {
    fetchSwatches(dispatch, state.total);
    // eslint-disable-next-line
  }, []);

  const value = { state, dispatch };
  return (
    <SwitchStateContext.Provider value={value}>
      {children}
    </SwitchStateContext.Provider>
  );
};

function useSwatches() {
  const context = useContext(SwitchStateContext);
  if (context === undefined) {
    throw new Error("useSwatches must be used within a CountProvider");
  }

  return context;
}

export { SwatchProvider, useSwatches, fetchSwatches };
