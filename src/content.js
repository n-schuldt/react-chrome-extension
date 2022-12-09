/*global chrome*/
/* src/content.js */
import React from "react";
import ReactDOM from "react-dom";
import Frame, { FrameContextConsumer } from "react-frame-component";
import App from "./App";
class Main extends React.Component {
  render() {
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
            return <App document={document} window={window} isExt={true} />;
          }}
        </FrameContextConsumer>
      </Frame>
    );
  }
}

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

var templateIN = {
  name: "pv-top-card-v3--list",
  location: "pv-top-card-v3--list",
  image: "pv-top-card-section__photo",
  summary: "pv-about-section", // reducing data overhead
  company: "pv-top-card-v3--experience-list-item", //data retrieved will be filled in experience_list
  experience_list: [],
  contact: {
    email: "pv-contact-info__header",
  },
  skills: [],
  certifications: [],
};

// select name
const name = document.getElementsByTagName("h1")[0];
name.style["backgroundColor"] = "#FF00FF";
console.log("name", name.innerText);

//select banner
const banner = document.getElementsByClassName(
  "text-body-medium break-words"
)[0];
banner.style["backgroundColor"] = "#0A00FF";
console.log("banner", banner.innerText);
// get the text of the experience section
// const experience = document.getElementsByClassName(
//   "artdeco-card ember-view relative break-words pb3 mt2"
// );

Array.from(
  document.getElementsByClassName(
    "artdeco-card ember-view relative break-words pb3 mt2"
  )
).forEach(function (item) {
  console.log(item.id);
});
