import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import User from "./components/user/user";

ReactDOM.render(
  <React.StrictMode>
    <User domain={window.location.hostname} />
  </React.StrictMode>,
  document.getElementById('root')
);
