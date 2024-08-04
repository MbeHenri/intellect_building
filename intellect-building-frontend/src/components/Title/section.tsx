import { Link } from "react-router-dom";
import page_image from "../../assets/images/backgroud/4.jpeg";

interface Props {
  page: string;
}

const TitleSection: React.FC<Props> = ({ page }) => {
  return (
    <section
      className="page-title"
      style={{ backgroundImage: `url(${page_image})` }}
    >
      <div className="auto-container">
        <div className="clearfix">
          <div className="pull-left">
            <div className="title">In Wood We Trust</div>
            <h2>{page}</h2>
          </div>
          <div className="pull-right">
            <ul className="page-breadcrumb">
              <li>
                <Link to="/">home</Link>
              </li>
              <li>{page}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TitleSection;
