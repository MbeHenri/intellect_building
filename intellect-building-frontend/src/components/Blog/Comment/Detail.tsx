import Comment from "../../../models/comment";
import { formatDate } from "../../../utils/function";

interface Props {
  comment: Comment;
}

const CommentDetail: React.FC<Props> = ({ comment }) => {
  return (
    <>
      <div className="comment-box">
        <div className="comment">
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
      </div>

      {comment.replies.length > 0
        ? comment.replies.map((reply, i) => {
            return (
              <div className="comment-box">
                <div className="comment">
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
                    <div className="comment-time">
                      {formatDate(comment.date)}
                    </div>
                  </div>
                  <div className="text">{comment.content}</div>
                </div>
              </div>
            );
          })
        : null}
    </>
  );
};

export default CommentDetail;
