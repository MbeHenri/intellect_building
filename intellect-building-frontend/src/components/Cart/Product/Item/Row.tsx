import Product from "../../../../models/product";

interface Props {
  product: Product;
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
            <a href="/">
              <img src={product.img} alt="" />
            </a>
          </figure>
          <h6 className="prod-title">{product.name}</h6>
        </div>
      </td>
      <td className="price">{`$${product.quantity}`}</td>
      <td className="qty">
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
                handleChangeQuantity(product.quantity + 1);
              }}
            >
              <i className="glyphicon glyphicon-chevron-up"></i>
            </button>
            <button
              className="btn btn-default bootstrap-touchspin-down py-0"
              type="button"
              onClick={() => {
                const newq = product.quantity - 1;
                if (newq > 0) {
                  handleChangeQuantity(newq);
                }
              }}
            >
              <i className="glyphicon glyphicon-chevron-down"></i>
            </button>
          </span>
        </div>
      </td>
      <td className="sub-total">{`$${product.price * product.quantity}`}</td>
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
