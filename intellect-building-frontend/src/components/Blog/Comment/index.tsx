import { CommentSimple } from "../../../models/comment";
import { formatDate } from "../../../utils/function";

interface Props {
  comment: CommentSimple;
  handleClick: (comment: CommentSimple) => void;
  handleReply: (comment: CommentSimple) => void;
}

const CommentItem: React.FC<Props> = ({
  comment,
  handleClick,
  handleReply,
}) => {
  return (
    <div className="comment-box">
      <div className="comment">
        <div className="author-thumb">
          <img src={comment.owner.img} alt="" />
        </div>
        <div className="comment-info clearfix mb-0">
          <strong>{`${comment.owner.name} –`}</strong>
          <div className="comment-time">{formatDate(comment.date)}</div>
        </div>
        <span
          className="badge badge-pill badge-primary mb-3"
          onClick={(e) => {
            e.preventDefault();
            handleClick(comment);
          }}
          style={{ cursor: "pointer" }}
        >
          <span className="fa fa-comment">
            {` ${comment.nbreReplies}` +
              (comment.nbreReplies < 2 ? ` reply` : ` replies`)}
          </span>
        </span>
        <div className="text">{comment.content}</div>
        <a
          className="theme-btn reply-btn fa fa-mail-reply"
          href="/"
          onClick={(e) => {
            e.preventDefault();
            handleReply(comment);
          }}
        >
          Reply
        </a>
      </div>
    </div>
  );
};

export default CommentItem;
