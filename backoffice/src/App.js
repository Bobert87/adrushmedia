// src/App.js
import React from 'react';
import ApplicationContainer from './components/ApplicationContainer';
import { BrowserRouter} from 'react-router-dom';

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
