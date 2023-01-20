/*global chrome*/
/* src/content.js */
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Frame, { FrameContextConsumer } from "react-frame-component";
import App from "./App";

// call cloud function https://gpt3-generate-rm6o2vwn2q-uc.a.run.app usign fetch

//detect DOM changes

const obsConfig = { attributes: true, childList: true, characterData: true };

const Main = () => {
  const [name, setName] = useState(document.getElementsByTagName("h1")[0]);
  const [banner, setBanner] = useState(
    document.getElementsByClassName("text-body-medium break-words")[0]
  );
  const [data, setData] = useState({});

  const generateMessage = async (name, banner) => {
    console.log("CALLING CLOUD FUNCTION");
    setData({ text: "Text returned from cloud function" });
    return { text: "Text returned from cloud function" };
    // try {
    //   // set headers to content type json
    //   const response = await fetch(
    //     "https://gpt3-generate-rm6o2vwn2q-uc.a.run.app", // cloud function url
    //     { method: "POST", body: JSON.stringify({ name, banner }) }
    //   );

    //   const text = await response.json();

    //   if (!text) {
    //     throw new Error("No text returned");
    //   }
    //   setData(text);
    //   return text;
    // } catch (err) {
    //   console.error("Error generating message", err);
    //   throw new Error("Error generating message");
    // }
  };

  // const experience = document.getElementsByClassName(
  //   "artdeco-card ember-view relative break-words pb3 mt2"
  // );
  // // experience.style["backgroundColor"] = "#FF0000";
  // for (let i = 0; i < experience.length; i++) {
  //   console.log("Experience", experience[i]);
  //   experience[i].style["backgroundColor"] = "#FF0000";
  // }

  // console.log("Experience", experience);
  // const observer = new MutationObserver((mutations) => {
  //   mutations.forEach((mutation) => {
  //     //check if the h1 element has changed
  //     if (mutation.target.tagName === "H1") {
  //       console.log("H1 changed");
  //       //update the state
  //       setName(mutation.target);
  //     }
  //     //check if the banner element has changed
  //     if (mutation.target.className === "text-body-medium break-words") {
  //       console.log("Banner changed");
  //       //update the state
  //       setBanner(mutation.target);
  //     }
  //   });
  // });

  // observer.observe(document.body, obsConfig);

  name.style["backgroundColor"] = "#FF00FF";

  // document.getElementById("prompt-output").innerText = text;
  banner.style["backgroundColor"] = "#0A00FF";
  return (
    <Frame
      head={[
        <link
          type="text/css"
          rel="stylesheet"
          href={chrome.runtime.getURL("/static/css/content.css")}
        ></link>,
      ]}
    >
      <FrameContextConsumer>
        {({ document, window }) => {
          return (
            <App
              document={document}
              window={window}
              isExt={true}
              elements={[name, banner]}
              data={data}
              generateMessage={generateMessage}
            />
          );
        }}
      </FrameContextConsumer>
    </Frame>
  );
};

const app = document.createElement("div");
app.id = "my-extension-root";

document.body.appendChild(app);
ReactDOM.render(<Main />, app);

app.style.display = "none";

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === "clicked_browser_action") {
    toggle();
  }
});

function toggle() {
  if (app.style.display === "none") {
    app.style.display = "block";
  } else {
    app.style.display = "none";
  }
}
