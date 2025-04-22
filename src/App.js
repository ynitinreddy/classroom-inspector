import React, { useState } from "react";
import ImageUploader from "./components/ImageUploader";
import InspectionForm from "./components/InspectionForm";

function App() {
  const [uploadedFiles, setUploadedFiles] = useState([]);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>📸 Classroom Inspector</h1>
      <ImageUploader onUploadComplete={(files) => setUploadedFiles(files)} />
      {uploadedFiles.length > 0 && (
        <InspectionForm uploadedFiles={uploadedFiles} />
      )}
    </div>
  );
}

export default App;
