import React, {  } from 'react';
import { connect } from 'react-redux';
import actions from './actions';

const ComA = (props) => {
    const add = () => {
        props.add();
    }
    return (
        <div>
            <button onClick={add}>+</button>
            <button onClick={props.add1}>异步+</button>
        </div>
    );
};


export default connect(state=>state,actions)(ComA);