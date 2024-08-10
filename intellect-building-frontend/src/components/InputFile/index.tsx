import { ChangeEvent, useCallback, useState } from "react";
import "./index.css";

interface Props {
  children?: React.ReactNode;
  onChange?: (e: File) => void;
  drop_box?: boolean;
  in_drop_box?: boolean;
  accept?: string;
}
const InputFile: React.FC<Props> = ({
  onChange,
  children,
  drop_box,
  in_drop_box,
  accept,
}) => {
  const [dragging, setDragging] = useState(false);
  const setDraggingToTrue = useCallback(
    async (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      if (!dragging) {
        setDragging(true);
      }
    },
    [dragging]
  );

  const setDraggingToFalse = useCallback(
    async (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      if (dragging) {
        setDragging(false);
      }
    },
    [dragging]
  );

  const handleDrag = useCallback(
    async (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();

      let dt = e.dataTransfer;
      if (!dt) {
        return;
      }

      let files = dt.files;
      if (files.length > 0) {
        onChange && onChange(files[0]);
      }
      setDragging(false);
    },
    [onChange]
  );

  const handleUpload = useCallback(
    async (e: ChangeEvent) => {
      const file = (e.target as HTMLInputElement).files?.[0];

      if (file) {
        onChange && onChange(file);
      }
      setDragging(false);
    },
    [onChange]
  );

  return (
    <>
      {drop_box ? (
        <div
          className="drop-zone"
          style={{
            borderColor: dragging ? "blue" : "black",
          }}
          onDragOver={setDraggingToTrue}
          onDragEnter={setDraggingToTrue}
          onDragLeave={setDraggingToFalse}
          onDragEnd={setDraggingToFalse}
          onDrop={handleDrag}
        >
          <span>Drag and Drop</span>
          {in_drop_box ? <>{children}</> : null}
        </div>
      ) : (
        <>{children}</>
      )}

      <div className="theme-btn btn-style-two upload_btn mt-2">
        <input
          className="inputfile"
          type="file"
          accept={accept ?? ".jpg, .jpeg, .png"}
          onChange={handleUpload}
        />
        <span className="txt d-flex">
          <span className="fa fa-upload pr-2"></span>
          Upload
        </span>
      </div>
    </>
  );
};

export default InputFile;
