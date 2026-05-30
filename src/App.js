import React from "react";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import { Routes, Route } from "react-router-dom";
import './App.css';
import Home from "./components/Home";

import PaymentDetails from "./components/PaymentDetails";



function App() {


  return (
    <div className='App'>
     
    
<Routes>
    <Route
    path="/"
    element={<Home />}
  />

  <Route
    path="/payment-details"
    element={<PaymentDetails />}
  />
</Routes>

  
    </div>
  );
}

export default App;
