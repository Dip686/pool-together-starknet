import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import { extendTheme } from "@chakra-ui/react"

import Deposit from './flows/deposit';
import AdminFlow from './flows/Admin';

// The UX contains two flows, one for participant and the other is for admin
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
