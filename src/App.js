import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FileUpload from "./components/FileUpload";
import QuestionDisplay from "./components/QuestionDisplay";
import AnswerKeyForm from "./components/AnswerKeyForm";
import EvaluationResult from "./components/EvaluationResult";

const App = () => {
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [answerKey, setAnswerKey] = useState([]);

  return (
    <Router>
      <Routes>
        {/* Upload PDF Route */}
        <Route
          path="/"
          element={<FileUpload onQuestionsFetched={setQuestions} />}
        />

        {/* Question Display Route */}
        <Route
          path="/questions"
          element={
            <QuestionDisplay questions={questions} onSubmit={setUserAnswers} />
          }
        />

        {/* Answer Key Submission Route */}
        <Route
          path="/answer-key"
          element={
            <AnswerKeyForm questions={questions} onSubmit={setAnswerKey} />
          }
        />

        {/* Evaluation Route */}
        <Route
          path="/evaluate"
          element={
            <EvaluationResult
              questions={questions}
              userAnswers={userAnswers}
              answerKey={answerKey}
            />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
