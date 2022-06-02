import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { Authentication } from './contexts/AuthenticationContext';
import * as userServices from './services/userServices';
import Routes from './routes';

export default function App(): JSX.Element {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    async function validacaoInicial(): Promise<void> {
      const auth = await userServices.validateToken();
      if (auth) setIsAuthenticated(auth);
    }

    validacaoInicial();
  }, []);

  return (
    <Authentication.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      <BrowserRouter>
        <Routes />
        {/* <Route path="/login" element={isAuthenticated ? <Navigate to="/todo" replace /> : <Login loginUser={ userServices.loginUser }/>} />
          <Route path="/todo" element={isAuthenticated ? <ToDo /> : <Navigate to="/login" replace />} />
          <Route path="*" element={isAuthenticated ? <ToDo /> : <Navigate to="/login" replace />} /> */}
      </BrowserRouter>
    </Authentication.Provider>
  );
}
