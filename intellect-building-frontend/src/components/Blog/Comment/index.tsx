import Comment from "../../../models/comment";
import { formatDate } from "../../../utils/function";

interface Props {
  comment: Comment;
  handleClick: (comment: Comment) => void;
  handleReply: (comment: Comment) => void;
}

const CommentItem: React.FC<Props> = ({
  comment,
  handleClick,
  handleReply,
}) => {
  return (
    <div className="comment-box">
      <div
        className="comment"
        onClick={(e) => {
          e.preventDefault();
          handleClick(comment);
        }}
      >
        <div className="author-thumb">
          <img src="https://via.placeholder.com/70x70" alt="" />

          {comment.replies.length > 0 ? (
            <span className="fa fa-doc">
              {comment.replies.length
                ? `1 reply`
                : `${comment.replies.length} replies`}
            </span>
          ) : null}
        </div>
        <div className="comment-info clearfix">
          <strong>{`${comment.nameOwner} –`}</strong>
          <div className="comment-time">{formatDate(comment.date)}</div>
        </div>
        <div className="text">{comment.content}</div>
      </div>
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
  );
};

export default CommentItem;
