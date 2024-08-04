import React, { ReactNode, createContext, useMemo, useState } from "react";
import Product from "../../models/product";

interface PropsContext {
  products: Array<Product>;
  tax: number;
  updateProducts: (newProducts: Product[]) => void;
}
interface PropsProvider {
  children: ReactNode;
}

export const CartContext = createContext<PropsContext>({
  products: [],
  tax: 0,
  updateProducts: (newProducts) => {},
});
const CartProvider: React.FC<PropsProvider> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([
    {
      uuid: "11",
      img: "https://via.placeholder.com/70x70",
      name: "Flying Ninja",
      quantity: 1,
      price: 99,
    },
    {
      uuid: "12",
      img: "https://via.placeholder.com/70x70",
      name: "Patient Ninja",
      quantity: 1,
      price: 99,
    },
  ]);

  const updateProducts = (newProducts: Product[]) => {
    setProducts(newProducts);
  };

  const tax = useMemo(() => 15.0, []);

  return (
    <CartContext.Provider value={{ products, tax, updateProducts }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
