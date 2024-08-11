import { useState } from "react";
import InputFile from "../../../../InputFile";
import { imageToBase64 } from "../../../../../utils/function";

interface Props {
  uuid?: string;
}

const PrivatePostItemComplete: React.FC<Props> = ({ uuid }) => {
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [image, setImage] = useState<string>("");

  return (
    <>
      <div className="checkout-page">
        <div className="auto-container">
          <div className="billing-details">
            <div className="shop-form">
              <div className="row clearfix">
                <div className="form-group col-lg-6 col-md-7 col-sm-12 col-xs-12">
                  <div className="field-label">
                    Presentation Image<sup>*</sup>
                  </div>
                  <InputFile
                    drop_box
                    in_drop_box
                    onChange={async (file) => {
                      if (file.type.startsWith("image/")) {
                        imageToBase64(file)
                          .then((base64String) => {
                            setImage(base64String);
                          })
                          .catch((error) => {
                            console.error(
                              "Erreur lors de la conversion de l'image en Base64:",
                              error
                            );
                          });
                      } else {
                        alert("Please provide a image");
                      }
                    }}
                  >
                    {image === "" ? null : (
                      <div className="w-100 h-100">
                        <img className="w-100 h-100" src={image} alt="" />
                      </div>
                    )}
                  </InputFile>
                </div>
                <div className="col">
                  <div className="billing-inner">
                    <div className="row clearfix">
                      {/* <!--Form Group--> */}
                      <div className="form-group col-md-12 col-sm-12 col-xs-12">
                        <div className="field-label">
                          Title <sup>*</sup>
                        </div>
                        <input
                          type="text"
                          name="field-name"
                          value={title}
                          onChange={(e) => {
                            setTitle(e.target.value);
                          }}
                          placeholder="Title..."
                        />
                      </div>

                      <div className="form-group col-md-12 col-sm-12 col-xs-12">
                        <div className="field-label">Content</div>
                        <textarea
                          placeholder="Note about Post"
                          value={comment}
                          onChange={(e) => {
                            setComment(e.target.value);
                          }}
                          style={{ height: "18rem" }}
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-left">
            <button type="submit" className="theme-btn checkout-btn">
              {uuid ? "Update" : "Add"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivatePostItemComplete;
