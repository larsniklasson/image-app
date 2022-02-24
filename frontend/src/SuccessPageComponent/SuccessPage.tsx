import React from "react";
import "./SuccessPage.css";

interface PropTypes {
  fileName: string;
  name: string;
  onAnotherUpload: () => void;
}

const SuccessPage: React.FC<PropTypes> = ({
  fileName,
  name,
  onAnotherUpload,
}) => {
  return (
    <>
      <div id="success-text">
        You successfully uploaded <i>{fileName}</i> as <b>{name}</b>!
      </div>
      <button id="upload-another-button" onClick={onAnotherUpload}>
        Upload another image
      </button>
    </>
  );
};

export default SuccessPage;
