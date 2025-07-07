import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { GoogleOAuthProvider } from '@react-oauth/google';
import Modal from 'react-modal'
import './styles/global.css';


Modal.setAppElement('#root')

ReactDOM.createRoot(document.getElementById('root')!).render(

  <React.StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_API_CLIENT_ID}>
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>

)
