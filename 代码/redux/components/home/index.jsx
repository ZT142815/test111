import React, {  } from 'react';
import { connect } from 'react-redux';
import { state } from './reducer';
import { actions } from './actions';


const Home = (props) => {
    console.log(props)
    const {main,actions} = props;
    const click = () => {
        actions.add()
    }
    return (
        <div>
            <div>{main.value}</div>
            <button onClick={click}>+</button>
        </div>
    );
};

export default connect(state,actions)(Home);