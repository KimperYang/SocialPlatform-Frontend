import React from 'react'
import ReactDom from 'react-dom'
import Router from "./router/index.jsx"
import App from "./App";

ReactDom.render(
    <Router>
        <App />
    </Router>
    ,
    document.getElementById('root')
);
