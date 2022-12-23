/*global chrome*/
/* src/content.js */
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Frame, { FrameContextConsumer } from "react-frame-component";
import axios from "axios";
import App from "./App";

//call cloud function https://gpt3-generate-rm6o2vwn2q-uc.a.run.app usign axios

// const generateMessage = async (prompt) => {
//   const response = axios
//     .get("https://gpt3-generate-rm6o2vwn2q-uc.a.run.app")
//     .then((response) => {
//       console.log("R1", response);
//     })
//     .catch((error) => {
//       console.log(error);
//     });
//   console.log("RES", response.data?.text);
//   return response.data?.text;
// };

const generateMessage = async (prompt) => {
  const response = await axios.get(
    "https://gpt3-generate-rm6o2vwn2q-uc.a.run.app"
  );
  console.log("RES", response.data?.text);
  return response.data?.text;
};

const Main = () => {
  const [name, setName] = useState(document.getElementsByTagName("h1")[0]);
  const [banner, setBanner] = useState(
    document.getElementsByClassName("text-body-medium break-words")[0]
  );

  // useEffect(() => {
  //   setName(document.getElementsByTagName("h1")[0]);
  //   setBanner(
  //     document.getElementsByClassName("text-body-medium break-words")[0]
  //   );
  //   console.log("DOM CHANGES", name, banner);
  // }, []);
  name.style["backgroundColor"] = "#FF00FF";
  const message = generateMessage();
  console.log("Message", message.data);
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
