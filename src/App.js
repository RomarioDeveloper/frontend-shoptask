import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ChakraBaseProvider, extendBaseTheme } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";

import Home from "./views/Home";
import Auth from "./views/Auth";

const theme = extendTheme({});

const App = () => {
  return (
    <BrowserRouter>
      <ChakraBaseProvider theme={theme}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </ChakraBaseProvider>
    </BrowserRouter>
  );
};

export default App;
