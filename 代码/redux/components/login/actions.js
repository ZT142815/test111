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
        const oldstate = getReducerState("loginReducer");
        dispatch({
          type: "change",
          payload: {
            value: oldstate.value + 1,
          },
        });
      },
      clean: () => {
        dispatch({
          type: "clean",
        });
      },
    },
  };
};
