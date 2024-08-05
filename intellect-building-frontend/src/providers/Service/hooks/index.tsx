import { useContext } from "react";
import { ServiceContext } from "..";

export default function useService() {
  return useContext(ServiceContext);
}

/* 
export function useCartProducts() {
    const { products, tax,updateProducts } = useCart();
    return { products, tax, updateProducts };
  } */
