import React from 'react';
import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Notifications = () => <ToastContainer autoClose={3000} transition={Slide} />;

export default Notifications;
