const initialState = {
  value: 0,
};

const homeReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case "init":
      return state;
    case "change":
        return {...state,...actions.payload}
    default:
      return state;
  }
};

export const state = (state) => ({main: state.homeReducer})

export default homeReducer;
