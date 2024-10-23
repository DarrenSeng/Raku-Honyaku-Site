import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from "react-router-dom";
import router from './routes';
import { AuthProvider } from './AuthContext';
import {ToastContainer, Zoom} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router}/> 
      <ToastContainer position="top-center" autoClose={2000} hideProgressBar={true} 
      newestOnTop={false} closeOnClick rtl={false} draggable transition={Zoom}/>
    </AuthProvider>
  </React.StrictMode>
);

