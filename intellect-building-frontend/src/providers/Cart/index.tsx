import React, { ReactNode, createContext, useMemo, useState } from "react";
import { ProductSimple } from "../../models/product";

interface PropsContext {
  products: ProductSimple[];
  tax: number;
  updateProducts: (newProducts: ProductSimple[]) => void;
  addProduct: (newProduct: ProductSimple) => void;
  inCart: (product: ProductSimple) => boolean;
}
interface PropsProvider {
  children: ReactNode;
}

export const CartContext = createContext<PropsContext>({
  products: [],
  tax: 0,
  updateProducts: (newProducts) => {},
  addProduct: (newProduct) => {},
  inCart: (newProduct) => true,
});
const CartProvider: React.FC<PropsProvider> = ({ children }) => {
  const [products, setProducts] = useState<ProductSimple[]>([]);

  const updateProducts = (newProducts: ProductSimple[]) => {
    setProducts(newProducts);
  };

  const addProduct = (newProduct: ProductSimple) => {
    !products.find((e) => e.uuid === newProduct.uuid) &&
      setProducts([...products, newProduct]);
  };

  const inCart = (newProduct: ProductSimple) => {
    return products.find((e) => e.uuid === newProduct.uuid) ? true : false;
  };

  const tax = useMemo(() => 15.0, []);

  return (
    <CartContext.Provider
      value={{ products, tax, updateProducts, addProduct, inCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
