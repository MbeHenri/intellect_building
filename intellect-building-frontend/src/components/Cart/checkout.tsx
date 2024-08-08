import { useMemo, useState } from "react";
import useCart from "../../providers/Cart/hooks";
import { compute_total } from "../../utils/function";
import EmptyLayer from "../EmptyLayer";

const CartCheckout: React.FC = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const { products, tax } = useCart();
  const subtotal = useMemo(() => {
    return compute_total(products);
  }, [products]);

  return (
    <div className="checkout-page">
      <div className="auto-container">
        {products.length > 0 ? (
          <>
            {/* <!--Default Links--> */}
            {/* <ul className="default-links">
            <li>
              Returning customer?
              <a href="/" data-toggle="modal" data-target="#schedule-box">
                Click here to login
              </a>
            </li>
          </ul> */}

            {/* <!--Billing Details--> */}
            <div className="billing-details">
              <div className="shop-form">
                <div className="row clearfix">
                  <div className="col-lg-7 col-md-12 col-sm-12">
                    <div className="sec-title">
                      <h2>Billing Details</h2>
                    </div>
                    <div className="billing-inner">
                      <div className="row clearfix">
                        {/* <!--Form Group--> */}
                        <div className="form-group col-md-6 col-sm-6 col-xs-12">
                          <div className="field-label">
                            First name <sup>*</sup>
                          </div>
                          <input
                            type="text"
                            name="field-name"
                            value={firstname}
                            onChange={(e) => {
                              setFirstname(e.target.value);
                            }}
                            placeholder="First Name"
                          />
                        </div>

                        {/* <!--Form Group--> */}
                        <div className="form-group col-md-6 col-sm-6 col-xs-12">
                          <div className="field-label">
                            Last name <sup>*</sup>
                          </div>
                          <input
                            type="text"
                            name="field-name"
                            value={lastname}
                            onChange={(e) => {
                              setLastname(e.target.value);
                            }}
                            placeholder="Last Name"
                          />
                        </div>

                        {/* <!--Form Group--> */}
                        <div className="form-group col-md-6 col-sm-6 col-xs-12">
                          <div className="field-label">
                            Country <sup>*</sup>
                          </div>
                          <select
                            name="country"
                            onChange={(e) => {
                              console.log(e.target.value);
                            }}
                          >
                            <option>Select an option</option>
                            <option>Pakistan</option>
                            <option>USA</option>
                            <option>CANADA</option>
                            <option>INDIA</option>
                          </select>
                        </div>

                        {/* <!--Form Group--> */}
                        <div className="form-group col-md-6 col-sm-6 col-xs-12">
                          <div className="field-label">
                            Phone <sup>*</sup>
                          </div>
                          <input
                            type="text"
                            name="field-name"
                            value={phone}
                            onChange={(e) => {
                              setPhone(e.target.value);
                            }}
                            placeholder="Select an option"
                          />
                        </div>

                        {/* <!--Form Group--> */}
                        <div className="form-group col-md-12 col-sm-12 col-xs-12">
                          <div className="field-label">
                            City <sup>*</sup>
                          </div>
                          <input
                            type="text"
                            name="field-name"
                            value={city}
                            onChange={(e) => {
                              setCity(e.target.value);
                            }}
                            placeholder="City"
                          />
                        </div>

                        {/* <!--Form Group--> */}
                        <div className="form-group col-md-12 col-sm-12 col-xs-12">
                          <div className="field-label">
                            Email Address <sup>*</sup>
                          </div>
                          <input
                            type="email"
                            name="field-name"
                            value={email}
                            onChange={(e) => {
                              setEmail(e.target.value);
                            }}
                            placeholder="Email Address"
                          />
                        </div>

                        {/* <div className="form-group col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div className="check-box">
                          <input
                            type="checkbox"
                            name="shipping-option"
                            id="account-option"
                          />
                          <label>Creata an account?</label>
                        </div>
                      </div> */}
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-5 col-md-12 col-sm-12">
                    <div className="sec-title">
                      <h2>Your Order</h2>
                    </div>
                    <div className="shop-order-box">
                      <ul className="order-list">
                        <li>
                          Prodcut<span>TOTAL</span>
                        </li>
                        {products.map((product, i) => {
                          return (
                            <li key={`prod-${i}`}>
                              {product.quantity
                                ? `${product.name} x ${product.quantity}`
                                : product.name}
                              <span>{`$${
                                (product.quantity ?? 1) * product.price
                              }`}</span>
                            </li>
                          );
                        })}
                        <li>
                          Subtotal
                          <span className="dark">{`$${subtotal}`}</span>
                        </li>
                        <li>
                          Tax<span>{tax > 0 ? `${tax}` : `Free Shipping`}</span>
                        </li>
                        <li className="total">
                          TOTAL
                          <span className="dark">{`$${tax + subtotal}`}</span>
                        </li>
                      </ul>

                      {/* <!--Place Order--> */}
                      <div className="place-order">
                        {/* <!--Payment Options--> */}
                        <div className="payment-options">
                          <ul>
                            <li>
                              <div className="radio-option">
                                <input
                                  type="radio"
                                  name="payment-group"
                                  id="payment-2"
                                />
                                <label>
                                  <strong>Direct Bank Transfer</strong>
                                  <span className="small-text">
                                    Make your payment directly into our bank
                                    account. Please use your Order ID as the
                                    payment reference. Your order won’t be
                                    shipped until the funds have cleared in our
                                    account.
                                  </span>
                                </label>
                              </div>
                            </li>
                            <li>
                              <div className="radio-option">
                                <input
                                  type="radio"
                                  name="payment-group"
                                  id="payment-1"
                                />
                                <label>
                                  <strong>Cheque Payment</strong>
                                  <span className="small-text">
                                    Make your payment directly into our bank
                                    account. Please use your Order ID as the
                                    payment reference. Your order won’t be
                                    shipped until the funds have cleared in our
                                    account.
                                  </span>
                                </label>
                              </div>
                            </li>

                            <li>
                              <div className="radio-option">
                                <input
                                  type="radio"
                                  name="payment-group"
                                  id="payment-3"
                                />
                                <label>
                                  <strong>Paypal</strong>
                                  <img
                                    src="images/resource/paypall.jpg"
                                    alt=""
                                  />
                                  <a href="/" className="what-paypall">
                                    What is PayPal?
                                  </a>
                                </label>
                              </div>
                            </li>
                          </ul>
                        </div>

                        <button
                          type="button"
                          className="theme-btn btn-style-two"
                        >
                          <span className="txt">Place Order</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <EmptyLayer text="no product in a cart" />
        )}
      </div>
    </div>
  );
};

export default CartCheckout;
