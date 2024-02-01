import React, { useEffect, useState } from "react";
import HeaderComponent from "../components/HeaderComponent";
import FooterComponent from "../components/FooterComponent";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Link, useParams } from "react-router-dom";

const PlayingPage = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isCorrect, setIsCorrect] = useState(null);
  const [remainingTime, setRemainingTime] = useState(60);
  const [selectedOption, setSelectedOption] = useState("");
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [isOptionClickable, setIsOptionClickable] = useState(true);
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        navigate("/login");
      }
      const { data } = await axios.post(
        "https://quizzapp-0h5c.onrender.com",
        {},
        { withCredentials: true }
      );
      const { status, user } = data;
      setUsername(user);
      return status ? "" : (removeCookie("token"), navigate("/login"));
    };
    verifyCookie();
  }, [cookies, navigate, removeCookie]);

  let { topicName } = useParams();
  const optionsLetter = ["A.", "B.", "C.", "D."];

  useEffect(() => {
    const getQuestionsByTopicName = async () => {
      try {
        const response = await axios.get(
          `https://quizzapp-0h5c.onrender.com/get-question/${topicName}`
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
    setIsOptionClickable(false);

    setTimeout(async () => {
      setCurrentQuestionIndex((prevIndex) =>
        prevIndex < questions.length - 1 ? prevIndex + 1 : prevIndex
      );
      if (currentQuestionIndex === questions.length - 1) {
        setQuizCompleted(true);
      }

      setIsCorrect(null);
      setIsOptionClickable(true);
      setSelectedOption("");
    }, 3000);
  };

  useEffect(() => {
    const handleSubmitScore = async () => {
      if (quizCompleted) {
        const { data } = await axios.post(
          "https://quizzapp-0h5c.onrender.com/submit-score",
          {
            username,
            score,
            topic: topicName,
          }
        );
        // console.log(data.message);
      }
    };
    handleSubmitScore();
  }, [quizCompleted]);

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
                <h2 className="mb-5" style={{ color: "#FFAE41" }}>
                  SCORE: {score}
                </h2>
                <Link
                  to={`/topic/${topicName}/playing`}
                  className="play-btn text-center mb-4"
                  style={{ width: "100%" }}
                  onClick={() => {
                    setQuizCompleted(false);
                    setCurrentQuestionIndex(0);
                    setRemainingTime(60);
                    setScore(0);
                  }}
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
                          onClick={() =>
                            isOptionClickable && handleOptionClick(option)
                          }
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
