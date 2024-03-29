import { Route, Routes } from 'react-router-dom'
import Navbar from './components/extra-components/Navbar';
import Error from './components/extra-components/Error';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import NewStudent from './components/pages/students/NewStudent'
import UpdateData from './components/UpdateData';
import React,{ useState } from 'react';
import CreateData from './components/pages/CreateData';
import './App.css'
import ReadData from './components/ReadData';
import Footer from './components/pages/Footer';
import ResetPassword from './components/extra-components/ResetPassword';
import NewProduct from './components/pages/products/NewProduct';
import ClientProviderAPI from './components/extra-components/api/ClientProviderAPI';

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
        <Route path="/createdata" element={<CreateData />} />
        <Route path="/newstudent" element={<NewStudent />} />
        <Route path="/readdata" element={<ReadData />} />
        <Route path="/readdata/:type/:id" element={<UpdateData />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/createproduct" element={<NewProduct />} />
        <Route path="/apitesting" element={<ClientProviderAPI />} />
        <Route path="/login" element={<Login setShowNav={setShowNav} />} />
        <Route path="*" element={<Error />} />
      </Routes>
      {showNav && <Footer />}
    </>
  );
}

export default App;
