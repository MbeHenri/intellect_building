import React from "react";
import { Expert } from "../../../../models/expert";

interface TeamItemProps {
  expert: Expert;
}

const TeamItem: React.FC<TeamItemProps> = ({ expert }) => {
  return (
    <div className="team-block-three col-12 col-sm-6 col-lg-4">
      <div className="inner-box">
        <div className="image">
          <img src={expert.img} alt="" />
          <ul className="social-box">
            <li>
              <a href={expert.linkFacebook}>
                <span className="fa fa-facebook-f"></span>
              </a>
            </li>
            <li>
              <a href="/">
                <span className="fa fa-linkedin"></span>
              </a>
            </li>
            <li>
              <a href="/">
                <span className="fa fa-twitter"></span>
              </a>
            </li>
            <li>
              <a href="/">
                <span className="fa fa-pinterest-p"></span>
              </a>
            </li>
            <li>
              <a href="/">
                <span className="fa fa-google-plus"></span>
              </a>
            </li>
          </ul>
        </div>
        <div className="lower-box">
          <div className="designation">{expert.speciality}</div>
          <h3>
            <a href="price.html">{expert.name}</a>
          </h3>
        </div>
      </div>
    </div>
  );
};

export default TeamItem;
