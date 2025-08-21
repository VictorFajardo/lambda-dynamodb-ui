import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AuthProvider } from 'react-oidc-context';
import { cognitoAuthConfig } from './auth/config.ts';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App.tsx';
import AutoLoginPage from './pages/AutoLogin.tsx';
// import CallbackPage from './pages/Callback.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider {...cognitoAuthConfig}>
      <BrowserRouter basename="/lambda-dynamodb-ui">
        <Routes>
          {/* <Route path="/callback" element={<CallbackPage />} /> */}
          <Route path="/demo-login" element={<AutoLoginPage />} />
          <Route path="/*" element={<App />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
);
