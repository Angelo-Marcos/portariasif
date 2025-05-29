import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { GoogleOAuthProvider } from '@react-oauth/google';
import Modal from 'react-modal'

Modal.setAppElement('#root') // 👈 configure aqui, antes do ReactDOM.createRoot

import './styles/global.css';

ReactDOM.createRoot(document.getElementById('root')!).render(

  <React.StrictMode>
    <GoogleOAuthProvider clientId="308422575392-i6qtk6oa5k4u90a2jhf4ae5j9oabsuqb.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>

)
