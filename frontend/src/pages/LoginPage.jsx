import React from "react";
import { Link } from "react-router-dom";

const LoginPage = () => {
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
        <div class="container py-5 h-100">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-12 col-md-8 col-lg-6 col-xl-5">
              <div
                class="card shadow-2-strong"
                style={{ borderRadius: "1rem" }}
              >
                <div class="card-body p-4">
                  <h4 class="mb-5 text-center">Log in to your account</h4>
                  <div class="form-outline mb-4">
                    <label class="form-label" for="typeEmailX-2">
                      Username
                    </label>
                    <input
                      type="email"
                      id="typeEmailX-2"
                      class="form-control"
                      placeholder="Type your username"
                    />
                  </div>

                  <div class="form-outline mb-4">
                    <label class="form-label" for="typePasswordX-2">
                      Password
                    </label>
                    <input
                      type="password"
                      id="typePasswordX-2"
                      class="form-control"
                      placeholder="Type your password"
                    />
                  </div>
                  <button
                    class="btn text-light w-100 mb-4"
                    type="submit"
                    style={{ background: "#5C0194" }}
                  >
                    Login
                  </button>
                  <div className="text-center mb-4">
                    <a href="">Forgot password?</a>
                  </div>
                  <div className="text-center">
                    <p>
                      Don’t have an account?{" "}
                      <Link to="/register">Sign Up Now</Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
