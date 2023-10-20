import { useReducer } from "react";

export const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_FILTERS":
      return {
        ...state,
        filters: [...action.filters],
      };
    default:
      return state;
  }
};

export function useFilterReducer(initialState) {
  return useReducer(reducer, initialState);
}
