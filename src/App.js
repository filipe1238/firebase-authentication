import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar';
import Error from './components/Error';
import Home from './components/Home';
import Login from './components/Login';
import { useState } from 'react';
import Search from './components/Search';

import './App.css'
function App() {
  const [showNav, setShowNav] = useState(true);


  return (
    <>
      {showNav && <Navbar />}

      {/* Switch === Routes */}
      <Routes>
        <Route path='/' element={<Home />} />
        {/* url param */}
        <Route path="/home" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/login" element={<Login setShowNav={setShowNav} />} />
        <Route path="*" element={<Error />} />



      </Routes>

    </>
  );
}

export default App;
