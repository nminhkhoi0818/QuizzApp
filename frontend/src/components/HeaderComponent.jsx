import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";

const HeaderComponent = () => {
  const [openAccount, setOpenAccount] = useState(false);
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        navigate("/login");
      }
      const { data } = await axios.post(
        "http://localhost:4000",
        {},
        { withCredentials: true }
      );
      const { status, user } = data;
      setUsername(user);
      return status ? "" : (removeCookie("token"), navigate("/login"));
    };
    verifyCookie();
  }, [cookies, navigate, removeCookie]);

  const Logout = () => {
    removeCookie("token");
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
                <a href="">My Profile</a>
                <a onClick={Logout} href="">
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
