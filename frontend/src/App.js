import React from "react";
import "./App.css";

const API_ROOT_URL = process.env.API_ROOT_URL || "http://localhost:3002";

// Everything in this file is just placeholder code and can be removed
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img
          alt=""
          src={`${API_ROOT_URL}/img/example.jpeg`}
          className="App-image"
        />
        <h1>Image Uploading App</h1>
        <p>{`Access the API on ${API_ROOT_URL}`}</p>
      </header>
    </div>
  );
}

export default App;
