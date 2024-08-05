import { useEffect, useState } from "react";
import { CommentSimple, Reply } from "../../../models/comment";
import useService from "../../../providers/Service/hooks";
import { formatDate } from "../../../utils/function";
import { useLoading } from "../../../utils/hooks";

interface Props {
  comment: CommentSimple;
}

const CommentDetail: React.FC<Props> = ({ comment }) => {
  // etat des réponses
  const [replies, setReplies] = useState<Reply[]>([]);
  // chargement du service
  const { intbuildService } = useService();
  // etat de chargement des réponses
  const { setError, setLoading } = useLoading();

  useEffect(() => {
    setLoading(true);
    intbuildService
      .getComment(comment)
      .then((comment) => {
        setReplies(comment.replies);
      })
      .catch((e) => {
        setError(e);
      })
      .finally(() => {
        setLoading(false);
      });
    return () => {};
  }, [comment, intbuildService, setError, setLoading]);

  return (
    <>
      <div className="comment-box">
        <div className="comment">
          <div className="author-thumb">
            <img src={comment.owner.img} alt="" />
          </div>
          <div className="comment-info clearfix mb-0">
            <strong>{`${comment.owner.name} –`}</strong>
            <div className="comment-time">{formatDate(comment.date)}</div>
          </div>
          <span className="badge badge-pill badge-primary mb-3">
            <span className="fa fa-comment">
              {` ${replies.length}` +
                (replies.length < 2 ? ` reply` : ` replies`)}
            </span>
          </span>
          <div className="text">{comment.content}</div>
        </div>
      </div>

      {replies.length > 0
        ? replies.map((reply, i) => {
            return (
              <div className="comment-box reply-comment" key={`reply-${i}`}>
                <div className="comment">
                  <div className="author-thumb">
                    <img src={reply.owner.img} alt="" />
                  </div>
                  <div className="comment-info clearfix">
                    <strong>{`${reply.owner.name} –`}</strong>
                    <div className="comment-time">{formatDate(reply.date)}</div>
                  </div>
                  <div className="text">{reply.content}</div>
                </div>
              </div>
            );
          })
        : null}
    </>
  );
};

export default CommentDetail;
