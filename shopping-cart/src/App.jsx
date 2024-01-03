import { useState } from "react";

import Header from "./components/Header.jsx";
import Shop from "./components/Shop.jsx";

import { useContext } from "react";
import ShoppingCartProvider from "./store/shopping-cart-context.jsx";

function App() {
  return (
    <>
      <ShoppingCartProvider>
        <Header />
        <Shop />
      </ShoppingCartProvider>
    </>
  );
}

export default App;
