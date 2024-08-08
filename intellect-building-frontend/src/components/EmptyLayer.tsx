interface Props {
  text?: string;
}

const EmptyLayer: React.FC<Props> = ({ text }) => {
  return (
    <>
      <div className="w-100 p-4 text-center">
        <h3>{text ?? "Empty Content"}</h3>
      </div>
    </>
  );
};

export default EmptyLayer;
