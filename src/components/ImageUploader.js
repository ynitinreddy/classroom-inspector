import React, { useState } from "react";
import axios from "axios";

const ImageUploader = ({ onUploadComplete }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (e) => {
    setSelectedFiles([...e.target.files]);
  };

  const API_BASE = process.env.REACT_APP_API_URL;


  const handleUpload = async () => {
    const formData = new FormData();
    selectedFiles.forEach((file) => formData.append("files", file));
  
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/upload`,
        formData
      );
      onUploadComplete(selectedFiles); // send back actual files
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };
  
  

  return (
    <div>
      <input type="file" multiple onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default ImageUploader;
