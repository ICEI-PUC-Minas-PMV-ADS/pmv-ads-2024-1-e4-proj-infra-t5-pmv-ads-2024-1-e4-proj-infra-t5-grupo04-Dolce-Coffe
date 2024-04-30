import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


import Home from './components/Home';
import Login from './components/Login'
import Cardapio from './components/Cardapio'

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/Home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Cardapio" element={<Cardapio />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
