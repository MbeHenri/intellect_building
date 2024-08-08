import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import CartProductItem from "./Product/Item";
import { compute_total } from "../../utils/function";
import useCart from "../../providers/Cart/hooks";

const CartBox: React.FC = () => {
  const { products, updateProducts } = useCart();

  const total = useMemo(() => {
    return compute_total(products);
  }, [products]);

  const [toogleDropdown, setToogleDropdown] = useState(false);

  return (
    <>
      {/* <!-- Cart Box --> */}
      <div className="cart-box mr-0">
        <div className={"dropdown" + (toogleDropdown ? " show" : "")}>
          <button
            className="cart-box-btn dropdown-toggle"
            type="button"
            id="dropdownMenu"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded={toogleDropdown}
            onClick={() => {
              setToogleDropdown(products.length > 0 && !toogleDropdown);
            }}
          >
            <span className="flaticon-shopping-bag-1"></span>
            {products.length > 0 ? (
              <span className="total-cart">{products.length}</span>
            ) : null}
          </button>
          {products.length > 0 ? (
            <div
              className={
                "dropdown-menu pull-right cart-panel" +
                (toogleDropdown ? " show" : "")
              }
              style={{ transform: "translate3d(-220px, 24px, 0px)" }}
              aria-labelledby="dropdownMenu3"
            >
              {products.map((product, i) => {
                return (
                  <CartProductItem
                    key={`prod-${i}`}
                    product={product}
                    handleDelete={() => {
                      updateProducts(
                        products.filter((p) => p.uuid !== product.uuid)
                      );
                    }}
                  />
                );
              })}
              <div className="cart-total">
                Sub Total: <span>{`$${total}`}</span>
              </div>
              <ul className="btns-boxed">
                <li>
                  <Link to="/cart">View Cart</Link>
                </li>
                <li>
                  <Link to="/checkout">CheckOut</Link>
                </li>
              </ul>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default CartBox;
