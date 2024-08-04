import Comment from "../../../models/comment";

interface Props {
  uuidPost: string;
  comment: Comment | null;
}

const CommentForm: React.FC<Props> = ({ uuidPost, comment }) => {
  return (
    <>
      <div className="comment-form">
        <div className="group-title">
          <h4>{`Leave Your ` + (comment ? "Reply" : "Comment")}</h4>
        </div>
        <div className="form-text">
          Your email address will not be published. Required fields are marked *
        </div>

        {/* <!--Comment Form--> */}
        <form
          method="post"
          action="https://expert-themes.com/html/sawmall/blog.html"
        >
          <div className="row clearfix">
            <div className="col-lg-6 col-md-6 col-sm-12 form-group">
              <input type="text" name="username" placeholder="Full Name" />
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12 form-group">
              <input type="email" name="email" placeholder="Email" required />
            </div>

            {/* <div className="col-lg-6 col-md-6 col-sm-12 form-group">
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                required
              />
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12 form-group">
              <input
                type="text"
                name="website"
                placeholder="Website"
                required
              />
            </div> */}

            <div className="col-lg-12 col-md-12 col-sm-12 form-group">
              <textarea
                className="darma"
                name="message"
                placeholder="Comment..."
              ></textarea>
            </div>

            <div className="col-lg-12 col-md-12 col-sm-12 form-group">
              <button
                className="theme-btn submit-btn"
                type="submit"
                name="submit-form"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default CommentForm;
