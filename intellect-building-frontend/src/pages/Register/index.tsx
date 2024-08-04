import background from "../../assets/images/backgroud/6.jpeg";

function Register() {
  return (
    <div className="page-wrapper">
      <section
        className="comming-soon d-flex justify-content-center align-items-center"
        style={{ backgroundImage: `url(${background})` }}
      >
        <div style={{ width: "20rem" }}>
          <div className="sec-title">
            <h1
              style={{
                color: "white",
                textAlign: "center",
                fontFamily: "Raleway",
              }}
            >
              Register
            </h1>
          </div>

          <div className="styled-form Register-form">
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
                  <span className="txt">Register Now</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Register;
