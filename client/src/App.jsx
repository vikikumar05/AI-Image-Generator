//rafce to create functional react component
import React, {useContext} from 'react'
import { Routes, Route } from 'react-router-dom'
import './index.css';  // or './src/index.css' based on location
import { AppContext } from './context/AppContext';

import Home from './pages/Home'
import BuyCredit from './pages/BuyCredit'
import Result from './pages/Result'
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './components/Login';
//React-Toastify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {

  const {showLogin} = useContext(AppContext);


  return (
    <div className="px-4 sm:px-10 md:px-14 lg:px-28 min-h-screen bg-gradient-to-b from-amber-50 to-amber-950">
      <ToastContainer position='top-right'/>
      <Navbar />
      {showLogin && <Login />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/result' element={<Result />} />
        <Route path='/buy' element={<BuyCredit />} />
      </Routes>
      <Footer />

    </div>
  )
}

export default App
