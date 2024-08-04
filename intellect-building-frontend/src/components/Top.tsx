import useSite from "../providers/Site/hooks";

const Top: React.FC = () => {
  const { topTarget } = useSite();
  return <div ref={topTarget}></div>;
};

export default Top;
