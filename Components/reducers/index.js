import { HANDLE_STORE_VOTES, HANDLE_STORE_CELEBRITIES } from "./types";

import initialState from "../reducers/initialState";

export const componentReducer = (state = initialState, action) => {
  switch (action.type) {
    case HANDLE_STORE_CELEBRITIES: {
      return {
        ...state,
        celebrities: action.payload,
      };
    }
    case HANDLE_STORE_VOTES: {
      return {
        ...state,
        counter: state.counter + action.value,
      };
    }
    default:
      return state;
  }
};
