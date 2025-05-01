import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import SignIn from './component/Singin';
import Admin from './layouts/Admin';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!sessionStorage.getItem('token'));

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  useEffect(() => {
    setIsLoggedIn(!!sessionStorage.getItem('token'));
  }, []);

  return (
    <BrowserRouter>
      {/* <Routes>
        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/admin/home" /> : <SignIn onLogin={handleLogin} />}
        />

        <Route
          path="/admin/*"
          element={isLoggedIn ? <Admin /> : <Navigate to="/login" />}
        />

        <Route
          path="*"
          element={<Navigate to={isLoggedIn ? "/admin/home" : "/login"} />}
        />
      </Routes> */}
        <Admin />
    </BrowserRouter>
  );
}

export default App;
