import React from "react";
import "../Components/Error.css";
import { useNavigate } from "react-router-dom";

function ErrorDisplay() {
  let navigate = useNavigate();

  function returnToHomePage() {
    navigate("/home");
  }

  return (
    <>
      <section className="section-container">
        <div className="errorContainer">
          <h1>404</h1>
          <h2 className="wordings">Page Not Found💔</h2>
          <h3>The page you are looking for does not exist.</h3>
          <button className="errorBtn" onClick={returnToHomePage}>
            Return to HomePage
          </button>
        </div>
      </section>
    </>
  );
}

export default ErrorDisplay;
