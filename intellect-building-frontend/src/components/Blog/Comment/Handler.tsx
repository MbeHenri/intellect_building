import { useState } from "react";
import CommentItem from ".";
import { CommentSimple } from "../../../models/comment";
import CommentForm from "./Form";
import CommentDetail from "./Detail";
import EmptyLayer from "../../EmptyLayer";

interface Props {
  uuidPost: string;
  comments: Array<CommentSimple>;
}

const CommentHandler: React.FC<Props> = ({ uuidPost, comments }) => {
  const [currentComment, setCurrentComment] = useState<CommentSimple | null>(
    null
  );

  return (
    <>
      {/* <!--Comments Area--> */}
      <div className="comments-area">
        <div className="group-title">
          <h4>{currentComment ? "Replies" : "Comments"}</h4>
        </div>

        {currentComment ? (
          <span
            style={{
              border: "2px solid black",
              padding: "10px 20px",
              fontSize: "25px",
              position: "absolute",
              top: 0,
              right: 0,
              cursor: "pointer",
            }}
            onClick={(e) => {
              e.preventDefault();
              setCurrentComment(null);
            }}
          >
            <span className="fa fa-angle-left"></span>
          </span>
        ) : null}

        {currentComment ? (
          <CommentDetail key={`cmt-current`} comment={currentComment} />
        ) : comments.length > 0 ? (
          comments.map((cmt, i) => {
            return (
              <CommentItem
                key={`cmt-${i}`}
                comment={cmt}
                handleClick={(cmt) => {
                  setCurrentComment(cmt);
                }}
                handleReply={(cmt) => {
                  setCurrentComment(cmt);
                  // go to formular
                }}
              />
            );
          })
        ) : (
          <EmptyLayer text="no comments" />
        )}
      </div>

      {/* <!-- Comment Form --> */}
      <CommentForm comment={currentComment} uuidPost={uuidPost} />
    </>
  );
};

export default CommentHandler;
