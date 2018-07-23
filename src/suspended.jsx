import React from "react";
import ReactDOM from "react-dom";
import SuspendedComponent from "./components/SuspendedComponent.jsx";
import "./styles.css";
/* jshint-disable no-undef */
/* eslint-disable no-undef */

function unsuspendTab() {
  browser.runtime.sendMessage({
    actionType: "unsuspend_from_tab",
  });
};

function suspendedPageListener(request, sender, sendResponse) {
  if (request.actionType === "load_suspender") {
    ReactDOM.render(
      <SuspendedComponent {...request.data} />,
      document.getElementById("root")
    );
  }
}

browser.runtime.onMessage.addListener(suspendedPageListener);

document.documentElement.addEventListener("click", unsuspendTab);
