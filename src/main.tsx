import App from './App.tsx';
import './index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AuthProvider } from 'react-oidc-context';
import { cognitoAuthConfig } from './auth/config.ts';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AutoLogin from './pages/AutoLogin.tsx';
import { Callback } from './pages/Callback.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider {...cognitoAuthConfig}>
      <BrowserRouter basename="/lambda-dynamodb-ui">
        <Routes>
          <Route path="/callback" element={<Callback />} />
          <Route path="/demo-login" element={<AutoLogin />} />
          <Route path="/*" element={<App />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
);
