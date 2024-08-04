import Product from "../../../../models/product";

interface Props {
  product: Product;
  handleDelete: () => void;
}

const CartProductItem: React.FC<Props> = ({ product, handleDelete }) => {
  return (
    <div className="cart-product">
      <div className="inner">
        <div className="cross-icon" onClick={handleDelete}>
          <span className="icon fa fa-remove"></span>
        </div>
        <div className="image">
          <img src={product.img} alt="" />
        </div>
        <h3>
          <a href="shop-single.html">{product.name}</a>
        </h3>
        <div className="quantity-text">{product.quantity}</div>
        <div className="price">{`$${product.price}`}</div>
      </div>
    </div>
  );
};

export default CartProductItem;
