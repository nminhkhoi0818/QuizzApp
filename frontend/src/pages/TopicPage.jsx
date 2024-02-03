import React, { useEffect, useState } from "react";
import HeaderComponent from "../components/HeaderComponent";
import FooterComponent from "../components/FooterComponent";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const TopicPage = () => {
  const { topicName } = useParams();
  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    const getLeaderboard = async () => {
      const { data } = await axios.get(
        `https://quizzapp-0h5c.onrender.com/leaderboard/${topicName}`,
        {}
      );
      setLeaderboardData(data.leaderboard);
    };
    getLeaderboard();
  }, []);
  return (
    <>
      <HeaderComponent />
      <div
        className="container-fluid py-4"
        style={{
          background: `url("/images/topic-bg.png")`,
          backgroundSize: "100% 100%",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="container" style={{ color: "#fff" }}>
          <div className="mb-4">
            <Link to={"/"} style={{ color: "#ffffff" }}>
              Home
            </Link>{" "}
            / <span style={{ color: "#FFAE41" }}>{topicName}</span>
          </div>
          <div className="dashboard d-flex justify-content-between">
            <div className="leaderboard-section d-flex flex-column justify-content-center align-items-center">
              <img
                src="/images/podium.png"
                alt=""
                className="my-3"
                style={{ width: "80px", height: "80px", borderRadius: "50%" }}
              />
              <p className="h5 my-3">Leaderboard</p>
              <div
                className="table-header d-flex justify-content-between"
                style={{ width: "90%" }}
              >
                <span>Username</span>
                <span>Score</span>
              </div>
              {leaderboardData.map((el, index) => {
                return (
                  <div
                    key={index}
                    className="table-data d-flex justify-content-between"
                    style={{ width: "90%" }}
                  >
                    <span>
                      {index + 1}. {el.username}
                    </span>
                    <span>{el.score}</span>
                  </div>
                );
              })}
            </div>
            <div className="play-section d-flex flex-column justify-content-center align-items-center">
              <img src="/images/icon-2.png" className="top-right-icon" alt="" />
              <img
                src="/images/icon-3.png"
                className="bottom-right-icon"
                alt=""
              />
              <p className="h5 mb-3 text-center">Do you want to attempt?</p>
              <Link
                to={`/topic/${topicName}/playing`}
                className="play-btn text-center"
                style={{ width: "60%" }}
              >
                PLAY NOW
              </Link>
            </div>
          </div>
        </div>
      </div>
      <FooterComponent />
    </>
  );
};

export default TopicPage;
