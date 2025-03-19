import React from "react";
import { useNavigate } from "react-router-dom";

const EvaluationResult = ({ questions, userAnswers, answerKey }) => {
  const navigate = useNavigate();

  if (!questions || !userAnswers || !answerKey) {
    return <p>Data not available for evaluation.</p>;
  }

  // Calculate Results
  const results = questions.map((q, index) => {
    const userAnswer = userAnswers[index]?.trim().toLowerCase() || ""; // Handle empty values
    const correctAnswer = answerKey[index]?.trim().toLowerCase();
    const attempted = userAnswer !== "";
    const isCorrect = attempted && userAnswer === correctAnswer;

    return {
      question: q.question,
      options: q.options,
      userAnswer,
      correctAnswer,
      isCorrect,
      attempted,
    };
  });

  // Summary Metrics
  const totalQuestions = questions.length;
  const attemptedQuestions = results.filter((r) => r.attempted).length;
  const correctAnswers = results.filter((r) => r.isCorrect).length;
  const incorrectAnswers = attemptedQuestions - correctAnswers;
  const score = correctAnswers * 2 - incorrectAnswers * 0.67;

  // Get Border Color for Questions
  const getQuestionBorderColor = (result) => {
    if (!result.attempted) return "#808080"; // Grey for Not Attempted
    return result.isCorrect ? "#4CAF50" : "#FF4C4C"; // Green for Correct, Red for Incorrect
  };

  // Get Border Color for Options
  const getOptionBorderColor = (optionKey, result) => {
    if (!result.attempted) {
      return optionKey === result.correctAnswer ? "#4CAF50" : "#ccc";
    }
    if (result.isCorrect) {
      return optionKey === result.correctAnswer ? "#4CAF50" : "#ccc";
    }
    if (optionKey === result.correctAnswer) return "#4CAF50";
    if (optionKey === result.userAnswer) return "#FF4C4C";
    return "#ccc";
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Evaluation Results</h2>

      {/* Summary Section */}
      <div style={styles.summaryContainer}>
        <p>
          <strong>Total Questions:</strong> {totalQuestions}
        </p>
        <p>
          <strong>Attempted:</strong> {attemptedQuestions}
        </p>
        <p>
          <strong>Correct:</strong> {correctAnswers}
        </p>
        <p>
          <strong>Incorrect:</strong> {incorrectAnswers}
        </p>
        <p>
          <strong>Score:</strong> {score.toFixed(2)}
        </p>
      </div>

      {/* Detailed Result Section */}
      {results.map((result, index) => (
        <div
          key={index}
          style={{
            ...styles.questionBlock,
            borderColor: getQuestionBorderColor(result),
          }}
        >
          <h4>Question {index + 1}</h4>
          <p>{result.question}</p>

          {/* Options in 2x2 Grid */}
          <div style={styles.optionsContainer}>
            {Object.entries(result.options).map(([key, value]) => (
              <div
                key={key}
                style={{
                  ...styles.option,
                  borderColor: getOptionBorderColor(key, result),
                }}
              >
                <strong>{key}</strong>: {value}
              </div>
            ))}
          </div>

          <p
            style={{
              color: !result.attempted
                ? "#808080"
                : result.isCorrect
                ? "#4CAF50"
                : "#FF4C4C",
            }}
          >
            {!result.attempted
              ? "Not Attempted"
              : result.isCorrect
              ? "Correct"
              : "Incorrect"}
          </p>
        </div>
      ))}

      {/* Button to Upload Again */}
      <button style={styles.button} onClick={() => navigate("/")}>
        Upload New PDF
      </button>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "#f9f9f9",
    minHeight: "100vh",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    color: "#333",
  },
  header: {
    color: "#333",
    marginBottom: "20px",
  },
  summaryContainer: {
    backgroundColor: "#fff",
    borderRadius: "8px",
    padding: "20px",
    marginBottom: "30px",
    width: "90%",
    maxWidth: "600px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    border: "1px solid #ccc",
  },
  questionBlock: {
    backgroundColor: "#fff",
    borderRadius: "8px",
    borderWidth: "6px", // Thicker Border
    borderStyle: "solid",
    padding: "20px",
    marginBottom: "20px",
    width: "90%",
    maxWidth: "600px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  },
  optionsContainer: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "10px",
    marginTop: "10px",
  },
  option: {
    backgroundColor: "#f0f0f0",
    padding: "10px",
    borderRadius: "8px",
    borderWidth: "4px",
    borderStyle: "solid",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "12px 24px",
    fontSize: "16px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    marginTop: "20px",
  },
};

export default EvaluationResult;
