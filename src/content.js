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
    console.log("mainFormValues", mainFormValues);
    console.log("info", profileInfo);
    console.log("pageElements", pageElements);

    const mainObj = {
      name: pageElements.name.innerText,
      banner: pageElements.banner.innerText,
      ...mainFormValues,
      ...profileInfo,
    };
    console.log("mainObj", mainObj);

    // set sample data
    // setData({
    //   text: `Hey Nicolas, I'm a bot and I'm here to help you. I'm going to generate a message for you based on the information you provided. I'm going to use the following information.

    // `,
    // });
    // return { text: "Text returned from cloud function" };
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

  name.style["backgroundColor"] = "#FF00FF";

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
