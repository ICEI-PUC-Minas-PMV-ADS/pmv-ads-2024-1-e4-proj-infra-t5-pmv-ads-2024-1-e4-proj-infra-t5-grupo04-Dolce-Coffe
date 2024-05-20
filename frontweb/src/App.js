import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';


import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './App.css'


import Home from './components/Home'
import Login from './components/Login';
import Cadastro from './components/Cadastro'
import HistoricoPedidos from './components/HistoricoPedidos';
import Carrinho from './components/Carrinho';
import FinalizarPedido from './components/FinalizarPedido';



function App() {
  return (
    <Router>
      <div>
        <Routes>
        <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/historico" element={< HistoricoPedidos />} />
          <Route path="/carrinho" element={< Carrinho />} />
          <Route path="/finalizarpedido" element={< FinalizarPedido />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;

