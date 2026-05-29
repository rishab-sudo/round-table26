import React from "react";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import { Routes, Route } from "react-router-dom";
import './App.css';

import HomeBanner from "./components/Home";



function App() {


  return (
    <div className='App'>
      <HomeBanner/>
    
{/* <Navbar/>
        <Routes>
      
         <Route path="/" element={<Home />} />
 
      </Routes>
       */}

  
    </div>
  );
}

export default App;
