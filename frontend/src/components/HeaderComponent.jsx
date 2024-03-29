import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const HeaderComponent = () => {
  const [openAccount, setOpenAccount] = useState(false);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  useEffect(() => {
    const getUser = async () => {
      const { data } = await axios.post(
        "https://quizzapp-0h5c.onrender.com",
        {},
        { withCredentials: true }
      );
      const { success, user } = data;
      if (success) {
        setUsername(user);
      } else {
        navigate("/login");
      }
    };
    getUser();
  }, [navigate]);

  const Logout = async () => {
    await axios.post(
      "https://quizzapp-0h5c.onrender.com/logout",
      {},
      { withCredentials: true }
    );
    navigate("/login");
  };

  return (
    <>
      <div
        className="container-fluid"
        style={{
          height: "60px",
          width: "100%",
          background:
            "linear-gradient(90deg, #3d105b 6.47%, #13062d 42.52%, #240a3f 72.23%, #3d105b 100%)",
        }}
      >
        <div className="container d-flex align-items-center text-light">
          <Link to="/" style={{ marginRight: "auto" }}>
            <img src="/images/logo.svg" alt="" />
          </Link>
          <div
            className="account"
            onMouseEnter={() => setOpenAccount(true)}
            onMouseLeave={() => setOpenAccount(false)}
          >
            <div className="d-flex justify-content-center align-items-center">
              <p>
                Hi, <span>{username}</span>
              </p>
              <img
                src="/images/shiba.png"
                alt=""
                className="account-image ms-4"
              />
            </div>
            {openAccount && (
              <div className="account-content">
                <Link to="/admin/topic-management">Topic management</Link>
                <a onClick={Logout} className="logout">
                  Log out
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderComponent;
