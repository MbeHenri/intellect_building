import { useEffect, useState } from "react";
import { UserProfileSimple } from "../../../models/user";
import useAuth from "../../../providers/Auth/hooks";
import useService from "../../../providers/Service/hooks";
import { useLoading } from "../../../utils/hooks";
import placeholder from "../../../assets/images/placeholder/user.png";
import "./index.css";
import { Link } from "react-router-dom";

const ProfileSessionBouton: React.FC = () => {
  const { user, deconnexion } = useAuth();
  const [profile, setProfile] = useState<UserProfileSimple | null>(null);

  const { intbuildService } = useService();
  const { loading, setLoading } = useLoading();

  const [toogleDropdown, setToogleDropdown] = useState(false);

  useEffect(() => {
    if (user) {
      // load profile
      setProfile({ img: "", name: "" });
      setLoading(true);
      intbuildService
        .getProfile()
        .then((profile) => setProfile(profile))
        .catch(() => {
          setProfile(null);
        })
        .finally(() => setLoading(false));
    } else {
      setProfile(null);
    }

    return () => {};
  }, [intbuildService, setLoading, user]);

  // load profile of user is connecter
  if (loading) {
    return <span className="skeleton-icon"></span>;
  }

  if (!profile) {
    return (
      <>
        <div className="btn-box">
          <Link to="/login" className="quote-btn theme-btn">
            <span className="fa fa-unlock-alt mr-1"></span> Login
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      {/* <!-- Cart Box --> */}
      <div className="cart-box ml-2 mt-1 mr-0">
        <div className={"dropdown" + (toogleDropdown ? " show" : "")}>
          <button
            className="cart-box-btn dropdown-toggle my-0"
            type="button"
            id="dropdownMenu"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded={toogleDropdown}
            onClick={() => {
              setToogleDropdown(!toogleDropdown);
            }}
          >
            <img
              className="profile_icon"
              src={profile.img === "" ? placeholder : profile.img}
              title={profile.name}
              alt=""
            />
          </button>
          <div
            className={
              "dropdown-menu pull-right cart-panel p-0" +
              (toogleDropdown ? " show" : "")
            }
            aria-labelledby="dropdownMenu3"
          >
            <Link className="dropdown-item btn_profile" to="*">
              <span className="fa fa-user pr-3"></span>
              My Profile
            </Link>
            <button
              type="button"
              className="dropdown-item btn_profile deconnexion"
              onClick={deconnexion}
            >
              <span className="fa fa-unlock-alt pr-3"></span>
              <span>Deconnexion</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileSessionBouton;
