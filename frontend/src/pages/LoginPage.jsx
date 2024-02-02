import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const LoginPage = () => {
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const { email, password } = inputValue;
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
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
    try {
      const { data } = await axios.post(
        "https://quizzapp-0h5c.onrender.com/login",
        { ...inputValue },
        { withCredentials: true }
      );
      const { success, message } = data;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        handleError(message);
      }
    } catch (error) {
      console.log(error);
    }
    setInputValue({
      ...inputValue,
      email: "",
      password: "",
      username: "",
    });
  };
  return (
    <>
      <div
        className="container-fluid"
        style={{
          background: `url("images/login-bg.png")`,
          backgroundSize: "100% 100%",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "100vh",
        }}
      >
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div
                className="card shadow-2-strong"
                style={{ borderRadius: "1rem" }}
              >
                <div className="card-body p-4">
                  <h4 className="mb-5 text-center">Log in to your account</h4>
                  <form onSubmit={handleSubmit}>
                    <div className="form-outline mb-4">
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={email}
                        className="form-control"
                        placeholder="Type your email"
                        onChange={handleOnChange}
                      />
                    </div>

                    <div className="form-outline mb-4">
                      <label className="form-label">Password</label>
                      <input
                        type="password"
                        name="password"
                        value={password}
                        className="form-control"
                        placeholder="Type your password"
                        onChange={handleOnChange}
                      />
                    </div>
                    <button
                      className="btn text-light w-100 mb-4"
                      type="submit"
                      style={{ background: "#5C0194" }}
                    >
                      Login
                    </button>
                  </form>
                  <div className="text-center">
                    <p>
                      Don’t have an account?{" "}
                      <Link to="/register" style={{ color: "#FFAE41" }}>
                        Sign Up Now
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default LoginPage;
