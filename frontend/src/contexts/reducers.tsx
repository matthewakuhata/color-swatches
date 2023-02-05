import {
  LockOrderSwatch,
  SwatchLockAction,
  SwatchState,
  SwatchUnlockAction,
  SwatchUpdateAction,
  SwatchesMap,
} from "./types";

export function lockReducer(
  state: SwatchState,
  action: SwatchLockAction
): SwatchState {
  const swatchId = action.id;
  const updateSwatch = state.swatches[swatchId];
  return {
    ...state,
    lockedSwatches: state.lockedSwatches + 1,
    swatches: {
      ...state.swatches,
      [updateSwatch.hex]: {
        ...updateSwatch,
        locked: true,
      },
    },
  };
}

export function unlockReducer(
  state: SwatchState,
  action: SwatchUnlockAction
): SwatchState {
  const swatchId = action.id;
  const updateSwatch = state.swatches[swatchId];

  return {
    ...state,
    lockedSwatches: state.lockedSwatches - 1,
    swatches: {
      ...state.swatches,
      [updateSwatch.hex]: {
        ...updateSwatch,
        locked: false,
      },
    },
  };
}

export function updateReducer(
  state: SwatchState,
  action: SwatchUpdateAction
): SwatchState {
  const newSwatches = action.newSwatches;

  if (newSwatches.length === 0) return state;

  const lockedSwatches: LockOrderSwatch[] = new Array(state.total);
  Object.values(state.swatches).forEach((swatch) => {
    if (swatch.locked) {
      lockedSwatches[swatch.ordering] = swatch;
    }
  });

  const allSwatches: SwatchesMap = {};
  for (let order = 0; order < state.total; order++) {
    const locked = lockedSwatches[order];

    if (!!locked) {
      allSwatches[locked.hex] = locked;
    } else {
      const newSwatch = newSwatches.pop()!;
      allSwatches[newSwatch.hex] = {
        ...newSwatch,
        ordering: order,
        locked: false,
      };
    }
  }

  return {
    ...state,
    swatches: {
      ...allSwatches,
    },
  };
}
