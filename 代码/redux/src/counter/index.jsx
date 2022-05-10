import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actions, selectCount } from "./reducer";

const Counter = () => {
  const [incrementAmount, setIncrementAmount] = useState(0);
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
        <input
          value={incrementAmount}
          onChange={(e) => setIncrementAmount(e.target.value)}
        />
        <button
          onClick={() =>
            dispatch(actions.incrementByAmount(Number(incrementAmount) || 0))
          }
        >
          确定
        </button>
      </div>
    </div>
  );
};

export default Counter;
