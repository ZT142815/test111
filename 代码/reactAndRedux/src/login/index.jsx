import React, { useEffect } from 'react';
import {useNavigate} from 'react-router-dom'
import { connect } from 'react-redux';
import { actions } from './actions';
import { state } from './reducer';

const Login = (props) => {
    const {actions,main} = props;
    const navigate = useNavigate();
    useEffect(() => {
        actions.init()
    }, [])
    const clickHandle = () => {
        navigate('/home')
    };
    const addClick = () => {
        actions.add()
    }
    const cleanClick = () => {
        actions.clean();
    }
    return (
        <div>
            <div>跳转的home</div>
            <button onClick={clickHandle}>点击</button>
            <div>----------------------</div>
            <div>我是{main.value}</div>
            <button onClick={addClick}>+</button>
            <button onClick={cleanClick}>重置</button>
        </div>
    );
}

export default connect(state,actions)(Login);