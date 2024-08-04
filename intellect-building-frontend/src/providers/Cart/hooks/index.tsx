import { useContext } from "react";
import { CartContext } from "..";

export default function useCart() {
  return useContext(CartContext);
}

/* 
export function useCartProducts() {
    const { products, tax,updateProducts } = useCart();
    return { products, tax, updateProducts };
  } */
  