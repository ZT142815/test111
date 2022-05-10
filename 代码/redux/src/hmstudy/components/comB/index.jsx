import React, {  } from 'react';
import { connect } from 'react-redux';

const ComB = (props) => {

    return (
        <div>{props.value}</div>
    );
};

const mapStateToProps = (state) => {
    return state;
}

export default connect(mapStateToProps)(ComB);