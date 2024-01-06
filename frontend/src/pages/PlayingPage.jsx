import React from "react";
import HeaderComponent from "../components/HeaderComponent";
import FooterComponent from "../components/FooterComponent";
import { Link, useParams } from "react-router-dom";

const PlayingPage = () => {
  let { topicName } = useParams();

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
            <div className="utils d-flex justify-content-around align-items-center mb-5">
              <div className="d-flex">
                <img src="/images/trophy-icon.png" alt="" />
                <h5 className="ms-3">26 pts</h5>
              </div>
              <div className="d-flex">
                <img src="/images/universe-icon.png" alt="" />
                <h5 className="ms-3">2/10</h5>
              </div>
              <div className="d-flex">
                <img src="/images/clock-icon.png" alt="" />
                <h5 className="ms-3">00:45</h5>
              </div>
            </div>
            <div className="quiz">
              <p className="question text-center h4 mb-4">
                Who wrote the words to the song “My Way”?
              </p>
              <p className="answer">
                <span style={{ color: "#FFAE41" }}>A.</span> Đen Vâu
              </p>
              <p className="answer">
                <span style={{ color: "#FFAE41" }}>B.</span> Paul Anka
              </p>
              <p className="answer">
                <span style={{ color: "#FFAE41" }}>C.</span> Frank Sinatra
              </p>
              <p className="answer">
                <span style={{ color: "#FFAE41" }}>D.</span> Vũ
              </p>
            </div>
          </div>
        </div>
      </div>
      <FooterComponent />
    </>
  );
};

export default PlayingPage;
