import { createContext, useReducer, useState } from "react";

import { DUMMY_PRODUCTS } from "../dummy-products.js";

export const ShoppingCartContext = createContext({
  items: [],
  handleAdd: () => {},
  handleUpdate: () => {},
});

function shoppingCartHandler(state, action) {
  if (action.type === "ADD") {
    const updatedItems = [...state.items];

    const existingCartItemIndex = updatedItems.findIndex(
      (cartItem) => cartItem.id === action.payload
    );
    const existingCartItem = updatedItems[existingCartItemIndex];

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      const product = DUMMY_PRODUCTS.find(
        (product) => product.id === action.payload
      );
      updatedItems.push({
        id: action.payload,
        name: product.title,
        price: product.price,
        quantity: 1,
      });
    }

    return {
      ...state,
      items: updatedItems,
    };
  }

  if (action.type === "UPDATE") {
    const updatedItems = [...state.items];
    const updatedItemIndex = updatedItems.findIndex(
      (item) => item.id === action.payload.productId
    );

    const updatedItem = {
      ...updatedItems[updatedItemIndex],
    };

    updatedItem.quantity += action.payload.amount;

    if (updatedItem.quantity <= 0) {
      updatedItems.splice(updatedItemIndex, 1);
    } else {
      updatedItems[updatedItemIndex] = updatedItem;
    }

    return {
      ...state,
      items: updatedItems,
    };
  }
}

export default function ShoppingCartProvider({ children }) {
  const [shoppingCart, shoppingCartDispatch] = useReducer(shoppingCartHandler, {
    items: [],
  });

  function handleAddItemToCart(id) {
    shoppingCartDispatch({
      type: "ADD",
      payload: id,
    });
  }

  function handleUpdateCartItemQuantity(productId, amount) {
    shoppingCartDispatch({
      type: "UPDATE",
      payload: { productId, amount },
    });
  }

  const cartCxt = {
    items: shoppingCart.items,
    handleAdd: handleAddItemToCart,
    handleUpdate: handleUpdateCartItemQuantity,
  };

  return (
    <ShoppingCartContext.Provider value={cartCxt}>
      {children}
    </ShoppingCartContext.Provider>
  );
}
