/*global chrome*/
import React, { useEffect } from "react";
import "./App.css";

function App(props) {
  useEffect(() => {
    console.log("PROPS", props);
  }, [props]);

  const [name, banner] = props.elements;
  const { generateMessage } = props;
  console.log("APP", name, banner);
  return (
    <div className="root">
      <section className="container">
        <div className="text-lg lg:text-3xl pt-10">
          <div className="header-title">
            <h1>
              <span className="text-blue-500">LinkGen </span> <br /> message
              generator
            </h1>
          </div>
          {/* <div className="header-subtitle font-thin tracking-widest pt-5 text-center">
            <h2>Networking Made Easier.</h2>
          </div> */}
        </div>
        {/* <p className="text-gray-300 text-center">
          This tool uses A.I. (GPT-3) to generate personalized LinkedIn
          messages. It is designed to help you quickly and easily craft
          professional, effective messages to your connections.
        </p> */}
      </section>
      <section className="container">
        <p>You are on {name.innerText}'s profile</p>
        {/* Button that calls an https cloud function and displays the ouptut in a paragraph, no CORS */}
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full border-0"
          onClick={() => {
            console.log("CLICKED");
            generateMessage();
          }}
        >
          Generate Message
        </button>
        <p id="prompt-output"></p>
      </section>

      <div className="badge-container grow"></div>
    </div>
  );
}

export default App;
