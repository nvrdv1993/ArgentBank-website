import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import SignIn from './pages/SignIn.jsx';
import User from './pages/User.jsx';
import Error from './pages/Error.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';

import UserGuard from './_helpers/userGuard.jsx';

function App() {
  return (
      <div className="App">
        <BrowserRouter>
        <Header />
          <Routes>
            <Route index element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/signIn" element={<SignIn />} />
            <Route path="/user" element={
              <UserGuard>
                <User />
              </UserGuard>
            } />
            <Route path="*" element={<Error />} />
          </Routes>
        </BrowserRouter>
        <Footer />
      </div>
  );
}

export default App;
