// src/App.js
import React from 'react';
import ApplicationContainer from './components/ApplicationContainer';
import { BrowserRouter, Link } from 'react-router-dom';
import { UsersIcon } from '@heroicons/react/24/outline';

import { Route, Router, Routes } from 'react-router-dom';


const stat = { id: 1, name: 'Total Subscribers', stat: '71,897', icon: UsersIcon, change: '122', changeType: 'increase' }

function App() {
  return (
    <>
      <BrowserRouter>           
        <ApplicationContainer />        
      </BrowserRouter>
    </>
  );
}

export default App;
