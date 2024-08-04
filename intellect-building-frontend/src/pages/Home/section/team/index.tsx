import React, { useMemo } from "react";
import TeamItem from "./item";
import background from "../../../../assets/images/backgroud/4.jpeg";
import image1 from "../../../../assets/images/team/1.jpeg";
import image2 from "../../../../assets/images/team/2.jpeg";
import image3 from "../../../../assets/images/team/3.jpeg";

const TeamSection: React.FC = () => {
  const experts = useMemo(
    () => [
      {
        name: "Monica Morala",
        img: image1,
        speciality: "Furniture Designer",
        linkFacebook: "/s",
        linkLinkedIn: "/",
      },
      {
        name: "Mandas Modo",
        img: image2,
        speciality: "Furniture Designer",
        linkFacebook: "/",
        linkLinkedIn: "/",
      },
      {
        name: "Ridoma Resazo",
        img: image3,
        speciality: "Furniture Designer",
        linkFacebook: "/",
        linkLinkedIn: "/",
      },
    ],
    []
  );

  return (
    <>
      {/* <!-- Team Section --> */}
      <section
        className="team-section-three mt-5"
        style={{ backgroundImage: `url(${background})` }}
      >
        <div className="auto-container">
          {/* <!-- Sec Title --> */}
          <div className="sec-title centered">
            <h2>Our Expert Team</h2>
            <div className="separate"></div>
          </div>
          <div className="three-item-carousel row">
            {experts.map((expert, i) => {
              return <TeamItem key={`expert-${i}`} expert={expert} />;
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default TeamSection;
