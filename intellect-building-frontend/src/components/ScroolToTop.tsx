import useSite from "../providers/Site/hooks";
import { useScrolling } from "../utils/hooks";

const ScroolToTop: React.FC = () => {
  const { isScrolling } = useScrolling();
  const { scrollToTopTarget } = useSite();
  return (
    <div
      className={"scroll-to-toped" + (isScrolling ? " show" : "")}
      data-target="html"
      onClick={() => {
        scrollToTopTarget && scrollToTopTarget();
      }}
    >
      <span className="fa fa-long-arrow-up"></span>
    </div>
  );
};

export default ScroolToTop;
