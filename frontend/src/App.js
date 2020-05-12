import React from "react";
import "./App.css";

const API_ROOT_URL = process.env.API_ROOT_URL || "http://localhost:3002";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>Image Uploading App</p>
        <p>{`Access the API on ${API_ROOT_URL}`}</p>
      </header>
    </div>
  );
}

export default App;
