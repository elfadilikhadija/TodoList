import './bootstrap';
import React from 'react';
import { createRoot } from 'react-dom';

import Tasks from './components/Tasks';
import Header from './components/Header';
import Create from './components/tasks/Create';
import Edit from './components/tasks/Edit';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
 import Calendar from './components/Calendar';
import Landing from './components/Landing';

createRoot(document.getElementById('app')).render(
    <BrowserRouter>
       
        <Routes>
           
            <Route path='/' exact element={<Landing />} />
            <Route path='/calendar' exact element={<Calendar />} /> 
            <Route path='/tasks' exact element={<Tasks />} />

            <Route path='/add' exact element={<Create />} />
            <Route path='/edit/:taskId' exact element={<Edit />} />

        </Routes>  {/* Here is the change you need */}
    </BrowserRouter>
);


