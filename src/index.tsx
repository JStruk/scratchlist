import React from 'react';
import App from './components/App';
import reportWebVitals from './reportWebVitals';

import './assets/index.css';
import { createRoot, Root } from "react-dom/client";
import ReactDOM from 'react-dom';

// const rootElement = document.getElementById("root");
// const root: Root = createRoot(rootElement);
// root.render(
//     <App />
// );

ReactDOM.render(
    <></>,
    document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
