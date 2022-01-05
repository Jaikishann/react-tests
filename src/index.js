import React from 'react';
import ReactDOM from 'react-dom';
import 'lit-starter-ts-test';
import './index.css';
import App from './App';
import Test from './test';
import reportWebVitals from './reportWebVitals';
// import RecordButton from './record-button';

// const recordbutton = new RecordButton();


ReactDOM.render(
  <React.StrictMode>
    <App />
    {/* <Test /> */}
    {/* <recordbutton /> */}
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
