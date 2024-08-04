import { useContext } from "react";
import { SiteContext } from "..";

export default function useSite() {
  return useContext(SiteContext);
}

/* 
export function useCartProducts() {
    const { products, tax,updateProducts } = useCart();
    return { products, tax, updateProducts };
  } */
