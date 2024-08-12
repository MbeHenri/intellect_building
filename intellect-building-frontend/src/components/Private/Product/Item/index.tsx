import { Link } from "react-router-dom";
import placehoderImage from "../../../../assets/images/placeholder/2.jpeg";
import { ProductSimple } from "../../../../models/product";
import useSite from "../../../../providers/Site/hooks";
import { useCallback } from "react";

interface Props {
  product: ProductSimple;
  handleDelete: () => void;
}

const PrivateProductItemRow: React.FC<Props> = ({ product, handleDelete }) => {
  const { scrollToTopTarget } = useSite();
  const toTop = useCallback(() => {
    scrollToTopTarget && scrollToTopTarget(100);
  }, [scrollToTopTarget]);

  return (
    <tr>
      <td className="prod-column">
        <div className="column-box">
          <figure className="prod-thumb">
            <Link onClick={toTop} to={`update/${product.uuid}`}>
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
      <td className="qty">{product.quantity ?? "–"}</td>
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

export default PrivateProductItemRow;
