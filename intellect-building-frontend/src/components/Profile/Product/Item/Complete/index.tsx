import { useState } from "react";
import InputFile from "../../../../InputFile";

interface Props {
  uuid?: String;
}

const ProfileProductItemComplete: React.FC<Props> = ({ uuid }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  //const [file, setFile] = useState<File | null>(null);

  return (
    <>
      <div className="checkout-page">
        <div className="auto-container">
          <div className="billing-details">
            <div className="shop-form">
              <div className="row clearfix">
                <div className="col">
                  <div className="billing-inner">
                    <div className="row clearfix">
                      {/* <!--Form Group--> */}
                      <div className="form-group col-md-12 col-sm-12 col-xs-12">
                        <div className="field-label">
                          Name <sup>*</sup>
                        </div>
                        <input
                          type="text"
                          name="field-name"
                          value={name}
                          onChange={(e) => {
                            setName(e.target.value);
                          }}
                          placeholder="Name..."
                        />
                      </div>

                      <div className="form-group col-md-6 col-sm-12 col-xs-12">
                        <div className="field-label">
                          Desciption <sup>*</sup>
                        </div>
                        <textarea
                          placeholder="Note about Training"
                          value={description}
                          onChange={(e) => {
                            setDescription(e.target.value);
                          }}
                          style={{ height: "18rem" }}
                        ></textarea>
                      </div>

                      <div className="form-group col-md-6 col-sm-12 col-xs-12">
                        <div className="field-label">
                          File<sup>*</sup>
                        </div>
                        <InputFile
                          onChange={async (file) => {
                            console.log(file);
                          }}
                          accept=".pdf, .zip, .rar, .cbz"
                        />
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

export default ProfileProductItemComplete;
