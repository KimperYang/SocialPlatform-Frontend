import React from 'react'
import {Outlet} from 'react-router-dom'
import './assets/antdesign.css'
import { Divider } from 'antd';
import './App.css'

function App() {
    return(
        <div>
        <div className='App'>
            <a href='/auth'>Login</a>
            <Divider type="vertical" />
            <a href='/registeration'>Signup</a>
        </div>
        <Outlet />
        </div>
    )
}

export default App