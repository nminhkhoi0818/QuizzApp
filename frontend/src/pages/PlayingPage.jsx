import React, { useEffect, useState } from "react";
import HeaderComponent from "../components/HeaderComponent";
import FooterComponent from "../components/FooterComponent";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const PlayingPage = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isCorrect, setIsCorrect] = useState(null);
  const [remainingTime, setRemainingTime] = useState(60);
  const [selectedOption, setSelectedOption] = useState("");
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);
  let { topicName } = useParams();
  const optionsLetter = ["A.", "B.", "C.", "D."];

  useEffect(() => {
    const getQuestionsByTopicName = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/get-question/${topicName}`
        );

        if (response.status === 200) {
          const fetchedQuestions = response.data.questions;
          setQuestions(fetchedQuestions);
        } else {
          console.error(
            "API Request failed:",
            response.status,
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error handling API request:", error.message);
      }
    };

    getQuestionsByTopicName();
  }, []);

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setRemainingTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => {
      clearInterval(countdownInterval);
    };
  }, []);

  const handleOptionClick = (option) => {
    const correctAnswer =
      questions[currentQuestionIndex].options[
        questions[currentQuestionIndex].correctOptionIndex
      ];
    setSelectedOption(option);

    const isAnswerCorrect = option === correctAnswer;

    if (isAnswerCorrect) {
      setScore(score + 10);
    }
    setIsCorrect(isAnswerCorrect);

    setTimeout(() => {
      setCurrentQuestionIndex((prevIndex) =>
        prevIndex < questions.length - 1 ? prevIndex + 1 : prevIndex
      );

      setIsCorrect(null);
    }, 3000);

    if (currentQuestionIndex === questions.length - 1) {
      setQuizCompleted(true);
    }
  };

  return (
    <>
      <HeaderComponent />
      <div
        className="container-fluid py-4"
        style={{
          background: `url("/images/playing-bg.png")`,
          backgroundSize: "100% 100%",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="container" style={{ color: "#fff" }}>
          <div className="mb-4">
            Home / <span>{topicName}</span> /{" "}
            <span style={{ color: "#FFAE41" }}>Playing</span>
          </div>
          <div className="main-content d-flex flex-column justify-content-center align-items-center py-5">
            <img src="/images/icon-1.png" className="top-left-icon" alt="" />
            <img src="/images/icon-2.png" className="top-right-icon" alt="" />
            <img
              src="/images/icon-3.png"
              className="bottom-right-icon"
              alt=""
            />
            <img src="/images/icon-4.png" className="bottom-left-icon" alt="" />
            {quizCompleted ? (
              <div className="d-flex flex-column align-items-center justify-content-center py-5">
                <h1 className="mb-3">QUIZ COMPLETE</h1>
                <h2 className="mb-3" style={{ color: "#FFAE41" }}>
                  SCORE: {score}
                </h2>
                <p className="mb-2" style={{ fontSize: "18px" }}>
                  Personal Best pts
                </p>
                <p className="mb-5" style={{ fontSize: "18px" }}>
                  Your Rank:{" "}
                </p>
                <Link
                  to={`/topic/${topicName}/playing`}
                  className="play-btn text-center mb-4"
                  style={{ width: "100%" }}
                >
                  PLAY AGAIN
                </Link>
                <Link
                  to={`/`}
                  className="white-btn text-center"
                  style={{ width: "100%", fontWeight: 600 }}
                >
                  Play other Topics
                </Link>
              </div>
            ) : (
              <>
                <div className="utils d-flex justify-content-around align-items-center mb-5">
                  <div className="d-flex">
                    <img src="/images/trophy-icon.png" alt="" />
                    <h5 className="ms-3">{score} pts</h5>
                  </div>
                  <div className="d-flex">
                    <img src="/images/universe-icon.png" alt="" />
                    <h5 className="ms-3">
                      {currentQuestionIndex + 1}/{questions.length}
                    </h5>
                  </div>
                  <div className="d-flex">
                    <img src="/images/clock-icon.png" alt="" />
                    <h5 className="ms-3">00:{remainingTime}</h5>
                  </div>
                </div>

                <div className="quiz">
                  <p className="question text-center h4 mb-4">
                    {questions[currentQuestionIndex]?.text}
                  </p>
                  {questions[currentQuestionIndex]?.options.map(
                    (option, index) => {
                      return (
                        <p
                          key={index}
                          className={`answer ${
                            option === selectedOption
                              ? isCorrect
                                ? "correct"
                                : "wrong"
                              : ""
                          }`}
                          style={{ cursor: "pointer" }}
                          onClick={() => handleOptionClick(option)}
                        >
                          <span
                            style={{
                              color: "#FFAE41",
                              fontWeight: 600,
                              fontSize: "18px",
                            }}
                          >
                            {optionsLetter[index]}
                            <span style={{ color: "#000", marginLeft: "32px" }}>
                              {option}
                            </span>
                          </span>
                        </p>
                      );
                    }
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <FooterComponent />
    </>
  );
};

export default PlayingPage;
