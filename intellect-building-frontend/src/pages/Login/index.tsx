import background from "../../assets/images/backgroud/6.jpeg";

function Login() {
  return (
    <div className="page-wrapper">
      <section
        className="comming-soon d-flex justify-content-center align-items-center"
        style={{ backgroundImage: `url(${background})` }}
      >
        <div>
          <div className="sec-title">
            <h1
              style={{
                color: "white",
                textAlign: "center",
                fontFamily: "Raleway",
              }}
            >
              Login Now
            </h1>
          </div>

          <div className="styled-form login-form">
            <div className="form-group">
              <span className="adon-icon">
                <span className="fa fa-user"></span>
              </span>
              <input
                type="text"
                name="username"
                value=""
                placeholder="Your Name *"
              />
            </div>
            <div className="form-group">
              <span className="adon-icon">
                <span className="fa fa-envelope-o"></span>
              </span>
              <input
                type="email"
                name="useremil"
                value=""
                placeholder="Emai Address*"
              />
            </div>
            <div className="form-group">
              <span className="adon-icon">
                <span className="fa fa-unlock-alt"></span>
              </span>
              <input
                type="password"
                name="userpassword"
                value=""
                placeholder="Enter Password"
              />
            </div>
            <div className="clearfix">
              <div className="form-group pull-left">
                <button type="button" className="theme-btn btn-style-two">
                  <span className="txt">Login Now</span>
                </button>
              </div>
              <div className="form-group social-links-two pull-right ml-5">
                <a href="/" className="img-circle facebook">
                  <span className="fa fa-facebook-f"></span>
                </a>
                <a href="/" className="img-circle twitter">
                  <span className="fa fa-twitter"></span>
                </a>
                <a href="/" className="img-circle google-plus">
                  <span className="fa fa-google-plus"></span>
                </a>
              </div>
            </div>

            <div className="clearfix">
              <div className="pull-left">
                <input type="checkbox" id="remember-me" />
                <label className="remember-me" style={{ color: "white" }}>
                  &nbsp; Remember Me
                </label>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;
