import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ListPage from './ListPage';
import Home from './Home';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ <Home /> } exact/>
                <Route path="/list" element={ <ListPage /> }/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
