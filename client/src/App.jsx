import React, { useEffect } from 'react';
import {BrowserRouter} from 'react-router-dom';

import AppRouter from './components/AppRouter';
import Navbar from './components/Navbar';

const tg = window.Telegram.WebApp;

function App() {

    useEffect(() => {
        tg.ready();
    },[])

    return (
        <BrowserRouter>
            <Navbar/>
            <AppRouter/>
        </BrowserRouter>
    )
}
export default App;