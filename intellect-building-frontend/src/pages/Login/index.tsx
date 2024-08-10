import { useCallback, useState } from "react";
import background from "../../assets/images/backgroud/6.jpeg";
import { useLoading } from "../../utils/hooks";
import Button from "../../components/Button";
import useAuth from "../../providers/Auth/hooks";

function Login() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [tooglePassword, setTooglePassword] = useState(false);

  const [errorLogin, setErrorLogin] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);

  const { loading, setLoading } = useLoading();

  const { connexion } = useAuth();

  const handleLogin = useCallback(
    (newLogin: string) => {
      errorLogin && setErrorLogin(false);
      setLogin(newLogin);
    },
    [errorLogin]
  );

  const handlePassword = useCallback(
    (newPassword: string) => {
      errorPassword && setErrorPassword(false);
      setPassword(newPassword);
    },
    [errorPassword]
  );

  const handleTooglePassword = useCallback(() => {
    setTooglePassword(!tooglePassword);
  }, [tooglePassword]);

  const handleSubmit = () => {
    if (!loading) {
      let error = false;
      if (login === "") {
        setErrorLogin(true);
        error = true;
      }
      if (password === "") {
        setErrorPassword(true);
        error = true;
      }

      if (!error) {
        setLoading(true);
        connexion(login, password).finally(() => {
          setLoading(false);
        });
      }
    }
  };

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
              Login Now
            </h1>
          </div>

          <div className="styled-form login-form">
            <div className="form-group">
              <span
                className="adon-icon"
                style={{ color: errorLogin ? "red" : undefined }}
              >
                <span className="fa fa-user"></span>
              </span>
              <input
                type="text"
                value={login}
                placeholder="Email Address*"
                onChange={(e) => {
                  handleLogin(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSubmit();
                  }
                }}
              />
            </div>
            <div className="form-group">
              <span
                className="adon-icon"
                style={{ color: errorPassword ? "red" : undefined }}
                onClick={handleTooglePassword}
              >
                <span
                  className={
                    "fa " + (tooglePassword ? "fa-lock" : "fa-unlock-alt")
                  }
                ></span>
              </span>
              <input
                type={tooglePassword ? "text" : "password"}
                value={password}
                placeholder="Enter Password"
                onChange={(e) => {
                  handlePassword(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSubmit();
                  }
                }}
              />
            </div>
            <div className="clearfix">
              <div className="form-group">
                <Button active={loading} onClick={handleSubmit}>
                  Login Now
                </Button>
              </div>
              {/* <div className="form-group social-links-two pull-right ml-5">
                <a href="/" className="img-circle facebook">
                  <span className="fa fa-facebook-f"></span>
                </a>
                <a href="/" className="img-circle twitter">
                  <span className="fa fa-twitter"></span>
                </a>
                <a href="/" className="img-circle google-plus">
                  <span className="fa fa-google-plus"></span>
                </a>
              </div> */}
            </div>

            {/* <div className="clearfix">
              <div className="pull-left">
                <input type="checkbox" id="remember-me" />
                <label className="remember-me" style={{ color: "white" }}>
                  &nbsp; Remember Me
                </label>
              </div>
            </div> */}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;
