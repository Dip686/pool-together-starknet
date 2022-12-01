import React from 'react';
import './App.css';
import { ChakraProvider } from '@chakra-ui/react';
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import { extendTheme } from "@chakra-ui/react"

import Deposit from './flows/deposit';
import AdminFlow from './flows/Admin';

const router = createBrowserRouter([
  {
    path: "/",
    element: <div className='custom-gradient-bg center-box'><Deposit /></div>,
  },
  {
    path: "admin",
    element: <div className='custom-gradient-bg center-box'><AdminFlow /></div>,
  },
]);

const theme = extendTheme({
  styles: {
    global: {
      // '.custom-gradient-bg': {
      //   height: '100vh',
      //   /* fallback for old browsers */
      //   background: '#667eea',

      //   /* Chrome 10-25, Safari 5.1-6 */
      //   background: '-webkit-linear-gradient(to left, rgb(0 28 154 / 90%), rgba(118,75,162,90%))',

      //   /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
      //   background: 'linear-gradient(to left, rgb(0 28 154 / 90%), rgba(118,75,162,90%))'
      // },
      '.center-box': {
        'width': '50%',
        'margin': 'auto',
        'border': '1px solid #ece7e7',
        'margin-top': '50px',
        'border-radius': '4px'
      }
    },
  },
});

function App() {
  return (
    <ChakraProvider theme={theme}>
      <RouterProvider router={router} />
    </ChakraProvider>
  );
}

export default App;
