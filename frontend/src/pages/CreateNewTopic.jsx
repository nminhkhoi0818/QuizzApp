import React, { useState } from "react";
import axios from "axios";
import HeaderComponent from "../components/HeaderComponent";
import FooterComponent from "../components/FooterComponent";

const CreateNewTopic = () => {
  const [topicName, setTopicName] = useState("");
  const [topicPicture, setTopicPicture] = useState(null);
  const [questions, setQuestions] = useState([{ text: "", answers: [] }]);
  const options = ["A", "B", "C", "D"];

  const handleAddQuestion = () => {
    setQuestions([...questions, { text: "", answers: [] }]);
  };

  const handleQuestionTextChange = (questionIndex, newText) => {
    const updatedQuestion = [...questions];
    updatedQuestion[questionIndex].text = newText;
    setQuestions(updatedQuestion);
  };

  const handleAnswerTextChange = (questionIndex, optionIndex, newText) => {
    const updatedQuestion = [...questions];
    updatedQuestion[questionIndex].answers[optionIndex] = newText;
    setQuestions(updatedQuestion);
  };

  const handleCorrectAnswerChange = (questionIndex, optionIndex) => {
    const updatedQuestion = [...questions];
    updatedQuestion[questionIndex].correctAnswerIndex = optionIndex;
    setQuestions(updatedQuestion);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      topicName,
      topicPicture,
      questions,
    };
    const { data } = await axios.post(
      "http://localhost:4000/create-topic",
      formData,
      { withCredentials: true }
    );
    console.log(data.message);
  };

  return (
    <>
      <HeaderComponent />
      <div
        className="container-fluid d-flex align-items-center"
        style={{
          height: "60px",
          width: "100%",
          background: "#FCF8FF",
        }}
      >
        <div className="container d-flex justify-content-between align-items-center">
          <p>
            Home / <span>Topic Management</span> /
            <span style={{ color: "#FFAE41" }}> Create new topic</span>
          </p>
        </div>
      </div>
      <div className="container-fluid py-4">
        <div className="container d-flex flex-column justify-content-center align-items-center">
          <h1 className="mb-4">Create new topic</h1>
          <form action="" className="quiz-form" onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <label htmlFor="" className="mb-2">
                Topic name
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter a topic"
                value={topicName}
                onChange={(e) => setTopicName(e.target.value)}
              />
            </div>
            <div className="form-group mb-4">
              <label htmlFor="" className="mb-2">
                Topic picture
              </label>
              <input
                className="form-control"
                type="file"
                id="formFile"
                onChange={(e) => setTopicPicture(e.target.files[0])}
              />
            </div>
            {questions.map((question, questionIndex) => (
              <div className="question-form mb-5" key={questionIndex}>
                <div className="question-header d-flex justify-content-between align-items-center mb-1">
                  <h3>QUESTION {questionIndex + 1}</h3>
                  <span
                    className="text-muted"
                    style={{ textDecoration: "underline" }}
                  >
                    Delete this question
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control mb-3"
                  name={`question-${questionIndex}`}
                  value={question.text}
                  onChange={(e) =>
                    handleQuestionTextChange(questionIndex, e.target.value)
                  }
                />
                <div className="answer-form">
                  {options.map((option, optionIndex) => (
                    <div className="answer-data" key={optionIndex}>
                      <h5 className="mb-2">Answer {option}</h5>
                      <input
                        type="text"
                        className="form-control mb-2"
                        name={`answer-${questionIndex}-${optionIndex}`}
                        value={question.answers[optionIndex] || ""}
                        onChange={(e) =>
                          handleAnswerTextChange(
                            questionIndex,
                            optionIndex,
                            e.target.value
                          )
                        }
                      />
                      <label className="radio-container">
                        Correct answer
                        <input
                          type="radio"
                          name={`correct-answer-${questionIndex}`}
                          checked={question.correctAnswerIndex === optionIndex}
                          onChange={() =>
                            handleCorrectAnswerChange(
                              questionIndex,
                              optionIndex
                            )
                          }
                        />
                        <span className="checkmark"></span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <div
              className="fw-bold fs-5"
              style={{ textDecoration: "underline" }}
              onClick={handleAddQuestion}
            >
              Add a new answer
            </div>
            <button className="save-btn" type="submit">
              Save changes
            </button>
          </form>
        </div>
      </div>
      <FooterComponent />
    </>
  );
};

export default CreateNewTopic;
