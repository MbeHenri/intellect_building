import { Link } from "react-router-dom";
import useCart from "../../providers/Cart/hooks";
import { useCallback, useMemo, useState } from "react";
import { compute_total } from "../../utils/function";
import CartProductItemRow from "./Product/Item/Row";
import { ProductSimple } from "../../models/product";
import EmptyLayer from "../EmptyLayer";

const CartList: React.FC = () => {
  const { products, tax, updateProducts } = useCart();

  const subTotal = useMemo(() => compute_total(products), [products]);

  const [productsState, setProductsState] =
    useState<Array<ProductSimple>>(products);

  const handleDelete = useCallback(
    (product: ProductSimple) => {
      setProductsState(productsState.filter((p) => p.uuid !== product.uuid));
    },
    [productsState]
  );

  const handleChangeQuantity = useCallback(
    (quantity: number, product: ProductSimple) => {
      setProductsState(
        productsState.map((p) => {
          if (p.uuid === product.uuid) {
            return { ...p, quantity };
          }
          return p;
        })
      );
    },
    [productsState]
  );

  const handleUpdateProducts = () => {
    updateProducts(productsState);
  };

  return (
    <section className="cart-section">
      <div className="auto-container">
        {/* <!--Cart Outer--> */}
        {products.length > 0 ? (
          <div className="cart-outer">
            <div className="table-outer">
              <table className="cart-table">
                <thead className="cart-header">
                  <tr>
                    <th className="prod-column">Product</th>
                    <th className="price">Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th>Remove</th>
                  </tr>
                </thead>

                <tbody>
                  {productsState.map((product, i) => {
                    return (
                      <CartProductItemRow
                        key={`prod-${i}`}
                        product={product}
                        handleChangeQuantity={(q) => {
                          handleChangeQuantity(q, product);
                        }}
                        handleDelete={() => {
                          handleDelete(product);
                        }}
                      />
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div
              className="coupon-outer clearfix"
              style={{ marginBottom: 0, marginTop: "10px" }}
            >
              <div className="pull-right">
                <button
                  type="button"
                  className="theme-btn btn-style-two"
                  onClick={handleUpdateProducts}
                >
                  <span className="txt">Update Cart</span>
                </button>
              </div>
            </div>

            {/* <!--Cart Total Box--> */}
            <div className="cart-total-box">
              <h4>Cart Totals</h4>
              {/* <!--Totals Table--> */}
              <ul className="totals-table">
                <li className="clearfix">
                  <span className="col col-title">Subtotal</span>
                  <span className="col">{`$${subTotal}`}</span>
                </li>
                <li className="clearfix">
                  <span className="col col-title">Tax</span>
                  <span className="col">{`$${tax}`}</span>
                </li>
                <li className="total clearfix">
                  <span className="col col-title">Total .</span>
                  <span className="col">{`$${tax + subTotal}`}</span>
                </li>
              </ul>
            </div>
            <div className="text-left">
              <Link to="/checkout" className="theme-btn checkout-btn">
                Proceed to Checkout
              </Link>
            </div>
          </div>
        ) : (
          <EmptyLayer text="no product" />
        )}
      </div>
    </section>
  );
};

export default CartList;
