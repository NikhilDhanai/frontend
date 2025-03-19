import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FileUpload = ({ onQuestionsFetched }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    try {
      const response = await axios.post(
        "https://backendgunicorn-app-app.onrender.com/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true, // Ensure credentials are included if needed
        }
      );

      if (response.data?.questions) {
        onQuestionsFetched(response.data.questions);
        navigate("/questions");
      } else {
        alert("No questions were extracted. Please check the PDF.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);

      if (error.response) {
        alert(`Error: ${error.response.data.error || "Unknown error"}`);
      } else if (error.request) {
        alert("Server did not respond. Make sure the backend is running.");
      } else {
        alert("Failed to upload the file. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <label htmlFor="file-upload" style={styles.selectButton}>
        Select PDF 📄
      </label>
      <input
        id="file-upload"
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />

      {file && <p style={styles.fileName}>{file.name}</p>}

      <button
        onClick={handleUpload}
        disabled={loading}
        style={styles.uploadButton(loading)}
      >
        {loading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
};

// ✅ Inline CSS for Styling
const styles = {
  container: {
    backgroundColor: "#000",
    color: "#fff",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Arial, sans-serif",
  },
  selectButton: {
    backgroundColor: "red",
    color: "white",
    padding: "15px 40px",
    fontSize: "18px",
    borderRadius: "30px",
    cursor: "pointer",
    marginBottom: "20px",
  },
  fileName: {
    marginBottom: "20px",
    color: "#ccc",
    fontSize: "14px",
    maxWidth: "80%",
    overflowWrap: "break-word",
  },
  uploadButton: (loading) => ({
    backgroundColor: "green",
    color: "white",
    padding: "15px 40px",
    fontSize: "18px",
    borderRadius: "30px",
    cursor: "pointer",
    border: "none",
    opacity: loading ? "0.7" : "1",
  }),
};

export default FileUpload;
