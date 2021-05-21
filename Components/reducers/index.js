import {
  HANDLE_STORE_VOTES,
  HANDLE_STORE_CELEBRITIES,
  HANDLE_UPDATE_CELEBRITIES,
  HANDLE_VIEW_TYPE,
} from "./types";

import initialState from "../reducers/initialState";

export const componentReducer = (state = initialState, action) => {
  let payload = action.payload;
  let type = action.type;
  switch (type) {
    case HANDLE_VIEW_TYPE:
      return {
        ...state,
        typeView: payload,
      };
    case HANDLE_STORE_CELEBRITIES: {
      return {
        ...state,
        celebrities: payload,
      };
    }
    case HANDLE_UPDATE_CELEBRITIES: {
      return {
        ...state,
        celebrities: state.voting,
      };
    }
    case HANDLE_STORE_VOTES: {
      return {
        ...state,
        voting: state.celebrities.map((d) => {
          if (d.name === payload.name) {
            return {
              ...d,
              alreadyVote: payload.alreadyVote,
              votingState: payload?.votingState,
              voteType: payload?.voteType,
              votes: {
                positive: (d.votes.positive += payload?.positive),
                negative: (d.votes.negative += payload?.negative),
              },
            };
          } else {
            return {
              ...d,
            };
          }
        }),
      };
    }
    default:
      return state;
  }
};
