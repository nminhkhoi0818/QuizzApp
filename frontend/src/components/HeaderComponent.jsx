import React from "react";

const HeaderComponent = () => {
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
          <img src="images/logo.svg" alt="" style={{ marginRight: "auto" }} />
          <div className="d-flex align-items-center">
            <p>
              Hi, <span>Minh Khoi</span>
            </p>
            <img src="images/girl.jpg" alt="" className="account-image ms-4" />
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderComponent;
