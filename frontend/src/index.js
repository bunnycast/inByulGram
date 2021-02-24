import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import './index.css';
import Root from 'pages';
import "antd/dist/antd.css";
import "./index.css";

ReactDOM.render(
    <BrowserRouter>
        <Root/>
    </BrowserRouter>,
    document.getElementById('root')
);
