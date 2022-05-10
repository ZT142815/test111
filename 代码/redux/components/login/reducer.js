const initialState = {
  value: null,
};
const loginReducer = (state = initialState, actions) => {
  const newState = actions.payload;
  switch (actions.type) {
    case "init":
      return { ...state, ...newState };
    case "change":
      return { ...state, ...newState };
    case "clean":
      return initialState;
    default:
      return state;
  }
};

export const state = (state) => ({main:state.loginReducer})

export default loginReducer;
