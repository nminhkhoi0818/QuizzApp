import React from "react";
import HeaderComponent from "../components/HeaderComponent";
import FooterComponent from "../components/FooterComponent";
import { Link, useParams } from "react-router-dom";

const TopicPage = () => {
  let { topicName } = useParams();
  let leaderboardData = [
    { username: "Minh Khoi", score: 1680 },
    { username: "Huu Phuc", score: 1213 },
    { username: "Sieu Dat", score: 1210 },
    { username: "sieucapvippro", score: 1111 },
    { username: "dep_trai_co_gi_sai", score: 1109 },
    { username: "chua_uong_da_sai", score: 1000 },
    { username: "username_1", score: 900 },
    { username: "username_2", score: 867 },
    { username: "username_3", score: 635 },
    { username: "username_4", score: 333 },
  ];
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
            Home / <span style={{ color: "#FFAE41" }}>{topicName}</span>
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
              <p className="h5 mb-3">Do you want to attempt?</p>
              <Link
                to={`/topic/${topicName}/playing`}
                className="play-btn text-center"
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
