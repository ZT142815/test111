import { getReducerState } from "../../store";
export const actions = (dispatch) => {
  return {
    actions: {
      init: () => {
        dispatch({
          type: "init",
          payload: {
            value: 0,
          },
        });
      },
      add: () => {
          dispatch({
              type: 'change',
              payload: {
                  value: getReducerState('homeReducer').value + 1
              }
          })
      }
    },
  };
};