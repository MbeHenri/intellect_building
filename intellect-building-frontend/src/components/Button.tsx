interface Props {
  children?: React.ReactNode;
  active?: boolean;
  type?: "base" | "primary";
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const Button: React.FC<Props> = ({ children, active, onClick, type }) => {
  let classModel = "btn-style-two";
  if (type) {
    switch (type) {
      case "base":
        break;
      case "primary":
        classModel = "checkout-btn";
        break;

      default:
        break;
    }
  }

  return (
    <button
      type="button"
      onClick={(e) => {
        if (!active) {
          onClick && onClick(e);
        }
      }}
      className={"theme-btn " + classModel}
      style={{
        cursor: active ? "not-allowed" : "pointer",
      }}
    >
      <span className="txt d-flex align-items-center">
        {active ? (
          <div className="mr-2">
            <span className="loader"></span>
          </div>
        ) : null}
        {children}
      </span>
    </button>
  );
};

export default Button;
