import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const QuestionDisplay = ({ questions, onSubmit }) => {
  const [userAnswers, setUserAnswers] = useState(
    Array(questions.length).fill("")
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const handleAnswerSelect = (answer) => {
    const updatedAnswers = [...userAnswers];

    // Toggle Selection (Unselect if already selected)
    if (updatedAnswers[currentIndex] === answer) {
      updatedAnswers[currentIndex] = "";
    } else {
      updatedAnswers[currentIndex] = answer;
    }

    setUserAnswers(updatedAnswers);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleSubmitTest = () => {
    onSubmit(userAnswers);
    navigate("/answer-key"); // Navigate to answer key submission
  };

  const question = questions[currentIndex];

  if (!question) {
    return <p>No questions available.</p>;
  }

  return (
    <div style={styles.container}>
      {/* Question Header */}
      <h4 style={styles.header}>
        Question {currentIndex + 1} of {questions.length}
      </h4>

      {/* Question Block */}
      <div style={styles.questionBlock}>
        {question.question.split("\n").map((line, i) => (
          <span key={i}>
            {line}
            <br />
          </span>
        ))}
      </div>

      {/* Options Block */}
      <div style={styles.optionsContainer}>
        {question.options &&
          Object.entries(question.options).map(([key, value]) => (
            <div
              key={key}
              style={{
                ...styles.optionBlock,
                backgroundColor:
                  userAnswers[currentIndex] === key ? "#007bff" : "#f0f0f0",
                color: userAnswers[currentIndex] === key ? "#fff" : "#000",
              }}
              onClick={() => handleAnswerSelect(key)}
            >
              <strong>{key}.</strong> {value}
            </div>
          ))}
      </div>

      {/* Navigation Buttons */}
      <div style={styles.buttonContainer}>
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          style={styles.button}
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={currentIndex === questions.length - 1}
          style={styles.button}
        >
          Next
        </button>
      </div>

      {/* Submit Test Button */}
      <button onClick={handleSubmitTest} style={styles.submitButton}>
        Submit Test
      </button>
    </div>
  );
};

// ✅ Inline CSS for Styling
const styles = {
  container: {
    backgroundColor: "#000",
    color: "#fff",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  header: {
    fontSize: "24px",
    marginBottom: "20px",
  },
  questionBlock: {
    backgroundColor: "#222",
    padding: "20px",
    borderRadius: "10px",
    maxWidth: "600px",
    width: "100%",
    marginBottom: "20px",
    textAlign: "left",
    lineHeight: "1.6",
  },
  optionsContainer: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
    marginBottom: "20px",
    width: "100%",
    maxWidth: "600px",
  },
  optionBlock: {
    backgroundColor: "#f0f0f0",
    color: "#000",
    padding: "15px",
    borderRadius: "10px",
    cursor: "pointer",
    textAlign: "left",
    transition: "background-color 0.3s ease",
    userSelect: "none",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    maxWidth: "600px",
    marginBottom: "20px",
  },
  button: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "12px 24px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    transition: "background-color 0.3s",
  },
  submitButton: {
    backgroundColor: "#28a745",
    color: "#fff",
    padding: "14px 28px",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
    fontSize: "18px",
    marginTop: "20px",
  },
};

export default QuestionDisplay;
