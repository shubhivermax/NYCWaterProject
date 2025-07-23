import { useState } from 'react'
import './App.css'


import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from './components/WaterFeild';
import DetailPage from './components/DetailPage';


function App() {
  

  return (

    <>
    <Router>
      {/* This is a comment inside JSX 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details/:site" element={<DetailPage />} />

      </Routes>
      */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details/:site" element={<DetailPage />} />

        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>

      
    </Router>
        

    </>
  )
}

export default App
