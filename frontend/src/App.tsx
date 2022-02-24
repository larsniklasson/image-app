import React, { useState } from "react";
import "./App.css";
import SelectImageButton from "./SelectImageButtonComponent/SelectImageButton";
import SuccessPage from "./SuccessPageComponent/SuccessPage";

const API_ROOT_URL = "http://localhost:3002";

const App: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [name, setName] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);
  const [hasUploaded, setHasUploaded] = useState(false);
  const [errorString, setErrorstring] = useState("");

  const onUpload = async () => {
    setIsUploading(true);
    const formData = new FormData();

    if (selectedFile) {
      formData.append("name", name); 
      formData.append("photo", selectedFile);
    }

    const options = {
      method: "POST",
      body: formData,
    };

    const res = await fetch(API_ROOT_URL + "/images", options);
    setIsUploading(false);
    if (res.status === 201) {
      setHasUploaded(true);
      setErrorstring("");
    } else {
      setErrorstring("Something went wrong! Try again...");
    }
  };

  const reset = () => {
    setSelectedFile(null);
    setHasUploaded(false);
    setName("");
  };

  return (
    <div id="wrapper">
      <h2 id="upload-header">Upload image</h2>

      {!hasUploaded ? (
        <>
          <table>
            <tbody>
              <tr id="file-row">
                <td style={{ width: "60px" }}>File</td>
                <td>
                  <SelectImageButton
                    selectedFile={selectedFile}
                    onSelectedFile={setSelectedFile}
                  />
                </td>
              </tr>
              <tr>
                <td>Name</td>
                <td>
                  <input
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                  ></input>
                </td>
              </tr>
            </tbody>
          </table>
          <button
            id="upload-button"
            disabled={!(selectedFile && name) || isUploading}
            onClick={onUpload}
          >
            {isUploading ? "Uploading..." : "Upload"}
          </button>
          {errorString && <span id="error-string">{errorString}</span>}
        </>
      ) : (
        <SuccessPage
          fileName={selectedFile?.name || ""}
          name={name}
          onAnotherUpload={reset}
        />
      )}
    </div>
  );
};

export default App;
