/*global chrome*/
import React, { useEffect, useState } from "react";
import "./App.css";
import MainForm from "./components/MainForm";
import PromptForm from "./components/PromptForm";
import Copy from "./components/Copy";

function App(props) {
  const [showInfo, setShowInfo] = useState(true);
  const [info, setInfo] = useState({});
  const { name, banner } = props.elements;
  const { generateMessage, data, isGenerating } = props;

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

  return (
    <div className="root">
      <section className="p-3 w-100 title-container shadow-lg">
        <div className="text-lg lg:text-3xl pt-10">
          <div className="header-title">
            <h1>
              Link<span className="text-blue-300">Gen</span>
            </h1>
          </div>
        </div>
      </section>

      <section className="container">
        <div className="text-center bg-blue-300 font-light rounded-md px-5">
          <p>
            You are on <span className="font-bold">{name.innerText}</span>'s
            profile
          </p>
        </div>
      </section>

      {/* divider */}

      <section className="container">
        {showInfo ? (
          <div id="">
            <PromptForm saveInfo={saveInfo} info={info} />
          </div>
        ) : (
          <>
            <div className="flex items-center">
              <p className="px-2 font-thin text-xs">
                You entered your information
              </p>
              <button
                className="border-blue-400 text-blue-500 bg-none hover:text-white poppins border-solid cursor-pointer hover:bg-blue-400 py-2 px-4 rounded-full border-2"
                onClick={() => {
                  changeInfo();
                }}
              >
                Change Info
              </button>
            </div>
            <div className="divider"></div>
            <MainForm
              info={info}
              generateMessage={generateMessage}
              pageElements={props.elements}
              isGenerating={isGenerating}
            />
          </>
        )}
      </section>
      {data?.text && (
        <section className="container bg-gray-200 py-2">
          <div className="output ">
            <div className="output-header-container font-bold text-3xl ">
              <div className="output-header pb-3">
                <h3 className="">Output</h3>
              </div>
            </div>
            <div className="   mx-3 opacity-70">
              <div className="pt-5 align-center p-4 shadow-lg rounded-md bg-blue-200">
                <p className="whitespace-pre-wrap text-sm">
                  {data?.text.trim()}
                </p>
              </div>
              <div className="flex justify-between w-full pb-3 px-3 pt-2">
                <p class="text-gray-600 text-xs italic self-start">
                  Not what you were expecting? Try again and change the wording
                  a bit! <br /> The same imput can lead to very different
                  outputs.
                </p>
                <div className="">
                  <Copy copyText={data?.text.trim()} />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <div className="badge-container grow"></div>
    </div>
  );
}

export default App;
