import React from "react";
import "./SelectImageButton.css";

interface PropTypes {
  selectedFile: File | null;
  onSelectedFile: (file: File | null) => void;
}

const SelectImageButton: React.FC<PropTypes> = ({
  selectedFile,
  onSelectedFile,
}) => {
  // Reference to a hidden file input. The input is used programmatically through another
  // button. This is to avoid showing the standard file input, which is quite ugly.
  const hiddenFileInput = React.useRef<HTMLInputElement>(null);

  const handleSelectButtonClick = () => {
    if (hiddenFileInput.current) {
      hiddenFileInput.current.click();
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      onSelectedFile(file);
      
      // Reset input state to avoid keeping state in this component
      if (hiddenFileInput.current) {
        hiddenFileInput.current.value = "";
      }
    }
  };

  const handleCloseButtonClick = () => {
    onSelectedFile(null);
  };

  return (
    <>
      <input
        ref={hiddenFileInput}
        type="file"
        accept="image/*"
        id="hidden-file-input"
        onChange={handleInputChange}
      />

      {!selectedFile ? (
        <button onClick={handleSelectButtonClick}>Select file</button>
      ) : (
        <div>
          <span>{selectedFile.name}</span>

          <button id="close-button" onClick={handleCloseButtonClick}>
            X
          </button>
        </div>
      )}
    </>
  );
};

export default SelectImageButton;
