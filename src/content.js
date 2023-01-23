/*global chrome*/
/* src/content.js */
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Frame, { FrameContextConsumer } from "react-frame-component";
import App from "./App";

const Main = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [name, setName] = useState(document.getElementsByTagName("h1")[0]);
  const [banner, setBanner] = useState(
    document.getElementsByClassName("text-body-medium break-words")[0]
  );
  const [data, setData] = useState({});

  // call cloud function https://gpt3-generate-rm6o2vwn2q-uc.a.run.app usign fetch
  const generateMessage = async (mainFormValues, profileInfo, pageElements) => {
    console.log("CALLING CLOUD FUNCTION");

    const mainObj = {
      name: pageElements.name.innerText,
      banner: pageElements.banner.innerText,
      ...mainFormValues,
      ...profileInfo,
    };
    try {
      setIsGenerating(true);
      // set headers to content type json
      const response = await fetch(
        "https://gpt3-generate-rm6o2vwn2q-uc.a.run.app", // cloud function url
        { method: "POST", body: JSON.stringify({ data: mainObj }) }
      );

      const text = await response.json();

      if (!text) {
        throw new Error("No text returned");
      }
      setData(text);
      setIsGenerating(false);
      return text;
    } catch (err) {
      setIsGenerating(false);
      console.error("Error generating message", err);
      throw new Error("Error generating message");
    }
  };

  // blue checkmark icon besides the baner and name
  const checkIcon = document.createElement("span");
  checkIcon.className = "ml-1 text-blue-500 flex items-center justify-center";
  checkIcon.innerHTML = `<svg class="max-w-4 max-h-4" fill="none" stroke="#9729ff" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style="height: 2rem;"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>`;

  // check if name is already set
  if (name) {
    // check if check icon is already set
    if (!name.querySelector(".ml-1")) {
      name.appendChild(checkIcon);
    }
  }

  // check if banner is already set
  if (banner) {
    // check if check icon is already set
    if (!banner.querySelector(".ml-1")) {
      banner.appendChild(checkIcon);
    }
  }

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
              elements={{
                name: name,
                banner: banner,
              }}
              data={data}
              generateMessage={generateMessage}
              isGenerating={isGenerating}
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
