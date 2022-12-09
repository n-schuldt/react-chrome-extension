/*global chrome*/
import React from "react";
import "./App.css";

function App() {
  return (
    <div className="root">
      <section className="container">
        <div className="text-white text-lg lg:text-3xl pt-10">
          <div className="header-title">
            <h1>
              <span className="text-blue-500">LinkGen </span> <br /> message
              generator
            </h1>
          </div>
          <div className="header-subtitle font-thin tracking-widest pt-5 text-center">
            <h2>Networking Made Easier.</h2>
          </div>
        </div>
        <p className="text-gray-300 text-center">
          This tool uses A.I. (GPT-3) to generate personalized LinkedIn
          messages. It is designed to help you quickly and easily craft
          professional, effective messages to your connections.
        </p>
      </section>

      <div className="badge-container grow"></div>
    </div>
  );
}

export default App;
