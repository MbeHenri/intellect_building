import { Link } from "react-router-dom";
import { ProductSimple } from "../../../../models/product";
import placehoderImage from "../../../../assets/images/placeholder/2.jpeg";

interface Props {
  product: ProductSimple;
  handleChangeQuantity: (quantity: number) => void;
  handleDelete: () => void;
}

const CartProductItemRow: React.FC<Props> = ({
  product,
  handleChangeQuantity,
  handleDelete,
}) => {
  return (
    <tr>
      <td className="prod-column">
        <div className="column-box">
          <figure className="prod-thumb">
            <Link to={`/training/${product.uuid}`}>
              <img
                src={product.img === "" ? placehoderImage : product.img}
                alt=""
              />
            </Link>
          </figure>
          <h6 className="prod-title">{product.name}</h6>
        </div>
      </td>
      <td className="price">{`$${product.price}`}</td>
      <td className="qty">
        {product.quantity ? (
          <div className="input-group bootstrap-touchspin">
            <span
              className="input-group-addon bootstrap-touchspin-prefix"
              style={{ display: "none" }}
            ></span>
            <input
              className="quantity-spinner form-control"
              type="text"
              value={`${product.quantity}`}
              name="quantity"
              onChange={(e) => {
                e.preventDefault();
                const newq = parseInt(e.target.value);
                if (!isNaN(newq) && newq > 0) {
                  handleChangeQuantity(newq);
                }
              }}
              style={{ display: "block" }}
            />
            <span
              className="input-group-addon bootstrap-touchspin-postfix"
              style={{ display: "none" }}
            ></span>
            <span className="input-group-btn-vertical">
              <button
                className="btn btn-default bootstrap-touchspin-up py-0 mb-1"
                type="button"
                onClick={() => {
                  product.quantity &&
                    handleChangeQuantity(product.quantity + 1);
                }}
              >
                <i className="glyphicon glyphicon-chevron-up"></i>
              </button>
              <button
                className="btn btn-default bootstrap-touchspin-down py-0"
                type="button"
                onClick={() => {
                  if (product.quantity) {
                    const newq = product.quantity - 1;
                    if (newq > 0) {
                      handleChangeQuantity(newq);
                    }
                  }
                }}
              >
                <i className="glyphicon glyphicon-chevron-down"></i>
              </button>
            </span>
          </div>
        ) : (
          "–"
        )}
      </td>
      <td className="sub-total">{`$${
        product.price * (product.quantity ?? 1)
      }`}</td>
      <td className="remove">
        <a
          href="/"
          className="remove-btn"
          onClick={(e) => {
            e.preventDefault();
            handleDelete();
          }}
        >
          <span className="flaticon-multiply"></span>
        </a>
      </td>
    </tr>
  );
};

export default CartProductItemRow;
