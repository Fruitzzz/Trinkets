import { React, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import {useCollection} from "../../hooks/collection.hook";
const Dropzone = () => {
  const {setImage} = useCollection();
  const onDrop = useCallback(
    (acceptedFile) => {
      setImage(acceptedFile);
    },
    [setImage]
  );
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    acceptedFiles,
  } = useDropzone({
    onDrop,
    accept: "image/*",
    multiple: false,
  });
  return (
    <div className="col s6 offset-s3 m4">
      <div {...getRootProps()} className="dropzone valign-wrapper">
        <input className="dropzone-input" {...getInputProps()} />
        <div className="text-center">
          {isDragActive ? (
            <h6 className="dropzone-content">
              Отпустите, для добавления изображения
            </h6>
          ) : (
            <h6 className="dropzone-content">
              Перетащите или кликните для добавления изображения
            </h6>
          )}
        </div>
      </div>
      {acceptedFiles.length !== 0 && (
        <p>
          {acceptedFiles[0].name} - {acceptedFiles[0].size} bytes
        </p>
      )}
    </div>
  );
};

export default Dropzone;
