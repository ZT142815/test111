import React from 'react';
import ReactDOM from 'react-dom';
import Router from './router';
import './app.less';

const App = () => {
  return (
      <Router />
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
