import React from "react";
import HeaderComponent from "../components/HeaderComponent";
import FooterComponent from "../components/FooterComponent";
import { Link } from "react-router-dom";

const HomePage = () => {
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
            <Link to="/topic/Entertainment">
              <div className="topic-card d-flex align-items-end d-flex align-items-end">
                <div className="topic-name">ENTERTAINMENT</div>
              </div>
            </Link>
            <div className="topic-card d-flex align-items-end">
              <div className="topic-name">KPOP</div>
            </div>
            <div className="topic-card d-flex align-items-end">
              <div className="topic-name">PETS</div>
            </div>
            <div className="topic-card d-flex align-items-end">
              <div className="topic-name">FOOTBALL</div>
            </div>
            <div className="topic-card d-flex align-items-end">
              <div className="topic-name">MUSIC</div>
            </div>
            <div className="topic-card d-flex align-items-end">
              <div className="topic-name">HISTORY</div>
            </div>
            <div className="topic-card d-flex align-items-end">
              <div className="topic-name">SCIENCE & NATURE</div>
            </div>
          </div>
        </div>
      </div>
      <FooterComponent />
    </>
  );
};

export default HomePage;
