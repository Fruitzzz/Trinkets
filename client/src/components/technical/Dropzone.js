import { React, useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import {useTranslation} from "react-i18next";
const Dropzone = ({setImage}) => {
  const [previewSource, setPreviewSource] = useState(null);
  const {t} = useTranslation();
  const onDrop = useCallback(
    (acceptedFile) => {
      const reader = new FileReader();
      reader.readAsDataURL(acceptedFile[0]);
      reader.onloadend = () => {
        setPreviewSource(reader.result);
        setImage(reader.result);
      };
    },
    [setImage]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*",
    multiple: false,
  });
  return (
    <div className="col s6 offset-s3 m4">
      <div {...getRootProps()} className="dropzone valign-wrapper">
        <input className="dropzone-input" {...getInputProps()} />
          {isDragActive ? (
            <h6 className="dropzone-content center-align">
              {t("drop-accept")}
            </h6>
          ) : (
            <h6 className="dropzone-content center-align">
              {t("drop-drag")}
            </h6>
          )}
      </div>
      {previewSource && (
        <img
          className="img-preview responsive-img"
          src={previewSource}
          alt="preview"
        />
      )}
    </div>
  );
};

export default Dropzone;
