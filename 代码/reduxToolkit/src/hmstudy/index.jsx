import React, {  } from 'react';
import { Provider } from 'react-redux';
import ComA from './components/comA';
import ComB from './components/comB';
import store from './store';

const Study = (props) => {
    return (
        <Provider store={store}>
            <div>
                <ComA/>
                <ComB/>
            </div>
        </Provider>
    );
};

export default Study;