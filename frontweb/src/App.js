import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import './App.css'
import Modal from './components/Modal'; 


import Home from './components/Home'

// function ShoppingCartApp() { 

//   const [isCartModalOpen, setIsCartModalOpen] = useState(false);


//   const openCartModal = () => {
//     setIsCartModalOpen(true);
//   };

//   // const closeCartModal = () => {
  //   setIsCartModalOpen(false);
  // };

  // return (
  //   <div>
  //     <Menu openCartModal={openCartModal} /> 
  //     <MainSection />
  //     <QuartaSec />
  //     <Footer />
  //     <Modal isOpen={isCartModalOpen} onClose={closeCartModal} /> 
  //   </div>
  // );
//}


function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;

