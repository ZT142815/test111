const actions = {
  add: () => ({
    type: "add",
  }),
  add1: () => {
    return (dispatch) => {
      setTimeout(() => {
        dispatch({
          type: "add",
        });
      }, 4000);
    };
  },
};

export default actions;
