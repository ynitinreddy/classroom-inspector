import React, { useState } from "react";
import axios from "axios";

const InspectionForm = ({ uploadedFiles }) => {
  const [inspector, setInspector] = useState("Nitin");
  const [classroom, setClassroom] = useState("DH101");
  const [model, setModel] = useState("gpt-4o");

  const handleInspect = async () => {
    const formData = new FormData();
    formData.append("inspector", inspector);
    formData.append("classroom", classroom);
    formData.append("model", model);

    uploadedFiles.forEach((file) => {
      formData.append("files", file); // file is directly File, not { file }
    });
    

    const API_BASE = process.env.REACT_APP_API_URL;

    const response = await axios.post(`${API_BASE}/inspect`, formData, { responseType: "blob" });

    // Create downloadable DOCX link
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `inspection_report.docx`);
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div>
      <label>Inspector:</label>
      <input value={inspector} onChange={(e) => setInspector(e.target.value)} />
      <label>Classroom:</label>
      <input value={classroom} onChange={(e) => setClassroom(e.target.value)} />
      <label>Model:</label>
      <select value={model} onChange={(e) => setModel(e.target.value)}>
        <option value="gpt-4o">gpt-4o</option>
        <option value="gpt-4o-mini">gpt-4o-mini</option>
      </select>
      <button onClick={handleInspect}>Run Inspection</button>
    </div>
  );
};

export default InspectionForm;
