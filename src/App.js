/*global chrome*/
import React, { useEffect, useState } from "react";
import "./App.css";
import MainForm from "./components/MainForm";
import PromptForm from "./components/PromptForm";

function App(props) {
  const [showInfo, setShowInfo] = useState(true);
  const [info, setInfo] = useState({});

  useEffect(() => {
    console.log("Info", showInfo);
  }, [showInfo]);

  useEffect(() => {
    checkForKey().then((response) => {
      if (response) {
        console.log("Check");
        setShowInfo(false);
        setInfo(response);
        document.getElementById("info_needed").style.display = "none";
        document.getElementById("info_entered").style.display = "block";
      }
    });
  }, []);

  const saveInfo = (input) => {
    // Save to google storage
    chrome.storage.local.set({ message_info: input }, () => {
      console.log("Info saved successfully");
      console.log("input", input);
      setInfo(input);
      setShowInfo(false);
      document.getElementById("info_needed").style.display = "none";
      document.getElementById("info_entered").style.display = "block";
    });
  };

  const changeInfo = () => {
    console.log("info changed");
    setShowInfo(true);
    document.getElementById("info_needed").style.display = "block";
    document.getElementById("info_entered").style.display = "none";
  };

  const checkForKey = () => {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get(["message_info"], (result) => {
        resolve(result["message_info"]);
      });
    });
  };

  const [name, banner] = props.elements;
  const { generateMessage, data } = props;
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
      {/* button to log the info */}
      <button
        onClick={() => {
          checkForKey().then((res) => console.log("RES", res));
        }}
      >
        Log Info
      </button>

      <section className="container">
        {showInfo ? (
          <div id="">
            <PromptForm saveInfo={saveInfo} info={info} />
          </div>
        ) : (
          <>
            <div>
              <p>You entered your information.</p>
              <button
                id="change_info_button"
                onClick={() => {
                  changeInfo();
                }}
              >
                Change Info
              </button>
            </div>
            <MainForm info={info} />
          </>
        )}
      </section>
      <section className="container">
        <p>You are on {name.innerText}'s profile</p>
        {/* Button that calls an https cloud function and displays the ouptut in a paragraph, no CORS */}
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full border-0"
          onClick={() => {
            console.log("CLICKED");
            generateMessage(name.innerText, banner.innerText).then((res) =>
              console.log("RES", res)
            );
          }}
        >
          Generate Message
        </button>
        <p id="prompt-output">{data?.text}</p>
      </section>

      <div className="badge-container grow"></div>
    </div>
  );
}

export default App;
