const PriavtePostRowSkeleton = () => {
  return (
    <tr>
      <td className="prod-column">
        <div className="column-box">
          <figure
            className="prod-thumb skeleton-box"
            style={{ width: "80px", height: "80px" }}
          >
            <div className="skeleton shimmer"></div>
          </figure>
          <h6
            className="prod-title skeleton-box skeleton-text"
            style={{ width: "150px" }}
          >
            {" "}
          </h6>
        </div>
      </td>
      <td className="skeleton-box skeleton-text" style={{ width: "50px" }}></td>
      <td className="skeleton-box skeleton-text" style={{ width: "50px" }}></td>
      <td className="remove">
        <div
          className="skeleton-box skeleton-icon"
          style={{ width: "20px", height: "20px" }}
        ></div>
      </td>
    </tr>
  );
};

export default PriavtePostRowSkeleton;
