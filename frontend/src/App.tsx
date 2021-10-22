import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./AppRouter";

function App() {
  useEffect(() => {}, []);
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
