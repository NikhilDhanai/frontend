import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AnswerKeyForm = ({ questions, onSubmit }) => {
  const [answerKey, setAnswerKey] = useState(Array(questions.length).fill(""));
  const navigate = useNavigate();

  const handleChange = (index, value) => {
    const newAnswerKey = [...answerKey];
    newAnswerKey[index] = value;
    setAnswerKey(newAnswerKey);
  };

  const handleSubmit = () => {
    if (answerKey.some((ans) => ans === "")) {
      alert("Please select answers for all questions.");
      return;
    }
    onSubmit(answerKey);
    navigate("/evaluate");
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Enter Answer Key</h2>

      {questions.map((_, index) => (
        <div key={index} style={styles.questionBlock}>
          <h4>Question {index + 1}</h4>

          {/* Larger Radio Buttons for A, B, C, D */}
          <div style={styles.radioGroup}>
            {["a)", "b)", "c)", "d)"].map((option) => (
              <label key={option} style={styles.radioLabel}>
                <input
                  type="radio"
                  name={`answer-${index}`}
                  value={option}
                  checked={answerKey[index] === option}
                  onChange={() => handleChange(index, option)}
                  style={styles.radioButton}
                />
                {option}
              </label>
            ))}
          </div>
        </div>
      ))}

      <button style={styles.submitButton} onClick={handleSubmit}>
        Submit Answer Key
      </button>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "#f0f8ff",
    minHeight: "100vh",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  heading: {
    color: "#007acc",
    marginBottom: "20px",
  },
  questionBlock: {
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    padding: "20px",
    marginBottom: "10px",
    width: "90%",
    maxWidth: "400px",
  },
  radioGroup: {
    display: "flex",
    justifyContent: "space-around",
    marginTop: "10px",
  },
  radioLabel: {
    cursor: "pointer",
    fontSize: "16px",
    display: "flex",
    alignItems: "center",
  },
  radioButton: {
    transform: "scale(1.5)", // Increase radio button size
    marginRight: "8px",
  },
  submitButton: {
    backgroundColor: "#4caf50",
    color: "#fff",
    border: "none",
    padding: "12px 20px",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer",
    marginTop: "20px",
  },
};

export default AnswerKeyForm;
