import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { actions, selectCount } from "./reducer";

const CounterTest = () => {
  const dispatch = useDispatch();
  const state = useSelector(selectCount);
  return (
    <div>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(actions.increment())}
        >
          +
        </button>
        <span>{state.value}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(actions.decrement())}
        >
          -
        </button>
      </div>
    </div>
  );
};

export default CounterTest;
