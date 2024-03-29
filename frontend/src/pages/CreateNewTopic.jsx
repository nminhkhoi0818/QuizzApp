import React, { useState } from "react";
import axios from "axios";
import HeaderComponent from "../components/HeaderComponent";
import FooterComponent from "../components/FooterComponent";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import storage from "../firebaseConfig.js";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const CreateNewTopic = () => {
  const [topicName, setTopicName] = useState("");
  const [topicPicture, setTopicPicture] = useState(null);
  const [questions, setQuestions] = useState([{ text: "", options: [] }]);
  const navigate = useNavigate();
  const options = ["A", "B", "C", "D"];
  const [topicPictureURL, setTopicPictureURL] = useState(
    "https://firebasestorage.googleapis.com/v0/b/quizzapp-a8632.appspot.com/o/files%2Fdefault.jpg?alt=media&token=63dfcb91-a944-4e32-adaf-6e1e7f7d7a95"
  );
  const [percent, setPercent] = useState(0);

  const handleAddQuestion = () => {
    setQuestions([...questions, { text: "", options: [] }]);
  };

  const handleQuestionTextChange = (questionIndex, newText) => {
    const updatedQuestion = [...questions];
    updatedQuestion[questionIndex].text = newText;
    setQuestions(updatedQuestion);
  };

  const handleAnswerTextChange = (questionIndex, optionIndex, newText) => {
    const updatedQuestion = [...questions];
    updatedQuestion[questionIndex].options[optionIndex] = newText;
    setQuestions(updatedQuestion);
  };

  const handleCorrectAnswerChange = (questionIndex, optionIndex) => {
    const updatedQuestion = [...questions];
    updatedQuestion[questionIndex].correctOptionIndex = optionIndex;
    setQuestions(updatedQuestion);
  };

  const handleDeleteQuestion = (questionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(questionIndex, 1);
    setQuestions(updatedQuestions);
  };

  const handleSuccess = (msg) => {
    toast.success(msg, {
      position: "bottom-right",
    });
  };

  const handleError = (msg) => {
    toast.error(msg, {
      position: "bottom-right",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      topicName,
      topicPictureURL,
      questions,
    };
    const { data } = await axios.post(
      "https://quizzapp-0h5c.onrender.com/create-topic",
      formData,
      { withCredentials: true }
    );
    const { success, message } = data;
    if (success) {
      handleSuccess(message);
      setTimeout(() => {
        navigate("/admin/topic-management");
      }, 1000);
    } else {
      handleError(message);
    }
  };

  const handleUploadImage = async () => {
    const storageRef = ref(storage, `/files/${topicPicture.name}`);
    const uploadTask = uploadBytesResumable(storageRef, topicPicture);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        setPercent(percent);
      },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setTopicPictureURL(url);
        });
      }
    );
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
            <Link to={"/"} style={{ color: "#000000" }}>
              Home
            </Link>{" "}
            / <Link to={"/admin/topic-management"}>Topic Management</Link> /
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
              <p>{percent} %</p>
              <button
                className="save-btn"
                type="button"
                onClick={handleUploadImage}
              >
                Save image
              </button>
            </div>
            {questions.map((question, questionIndex) => (
              <div className="question-form mb-5" key={questionIndex}>
                <div className="question-header d-flex justify-content-between align-items-center mb-1">
                  <h3>QUESTION {questionIndex + 1}</h3>
                  <span
                    className="text-muted"
                    style={{ textDecoration: "underline", cursor: "pointer" }}
                    onClick={() => handleDeleteQuestion(questionIndex)}
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
                        value={question.options[optionIndex] || ""}
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
                          checked={question.correctOptionIndex === optionIndex}
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
              style={{ textDecoration: "underline", cursor: "pointer" }}
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
      <ToastContainer />
    </>
  );
};

export default CreateNewTopic;
