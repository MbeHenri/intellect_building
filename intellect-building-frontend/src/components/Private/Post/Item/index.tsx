import { Link } from "react-router-dom";
import placehoderImage from "../../../../assets/images/placeholder/2.jpeg";
import { PostSimple } from "../../../../models/post";
import useSite from "../../../../providers/Site/hooks";
import { useCallback } from "react";

interface Props {
  post: PostSimple;
  handleDelete: () => void;
}

const PrivatePostItemRow: React.FC<Props> = ({ post, handleDelete }) => {
  const { scrollToTopTarget } = useSite();
  const toTop = useCallback(() => {
    scrollToTopTarget && scrollToTopTarget(100);
  }, [scrollToTopTarget]);
  return (
    <tr>
      <td className="prod-column">
        <div className="column-box">
          <figure className="prod-thumb">
            <Link onClick={toTop} to={`update/${post.uuid}`}>
              <img src={post.img === "" ? placehoderImage : post.img} alt="" />
            </Link>
          </figure>
          <h6>{post.title}</h6>
        </div>
      </td>
      <td>{post.publisher}</td>
      <td>{post.summary}</td>
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

export default PrivatePostItemRow;
