import React from 'react';
import {
  ChakraProvider,
  theme,
} from '@chakra-ui/react';
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";

import Deposit from './flows/deposit';
import AdminFlow from './flows/Admin';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Deposit />,
  },
  {
    path: "admin",
    element: <AdminFlow />,
  },
]);

function App() {
  return (
    <ChakraProvider theme={theme}>
      <RouterProvider router={router} />
    </ChakraProvider>
  );
}

export default App;
