import React from "react";
import HeaderComponent from "../components/HeaderComponent";
import FooterComponent from "../components/FooterComponent";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const HomePage = () => {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    const getAllTopics = async () => {
      const { data } = await axios.get("http://localhost:4000/topics", {});
      setTopics(data.topics);
    };
    getAllTopics();
  }, []);

  return (
    <>
      <HeaderComponent />
      <div
        className="container-fluid d-flex align-items-center mb-3"
        style={{
          height: "60px",
          width: "100%",
          background: "#FCF8FF",
        }}
      >
        <div className="container">
          Welcome to TRIVIA GAME - Test Your Knowledge
        </div>
      </div>
      <div className="container-fluid mb-3">
        <div className="container">
          <div className="topic-cards">
            {topics &&
              topics.map((topic, index) => (
                <Link to={`/topic/${topic.name}`} key={index}>
                  <div
                    className="topic-card d-flex align-items-end d-flex align-items-end"
                    style={{
                      background: `url(${topic.picture}) no-repeat center`,
                      backgroundSize: "cover",
                    }}
                  >
                    <div
                      className="topic-name"
                      style={{
                        textTransform: "capitalize",
                      }}
                    >
                      {topic.name}
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
      <FooterComponent />
      <ToastContainer />
    </>
  );
};

export default HomePage;
