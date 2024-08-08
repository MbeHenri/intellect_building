import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import "./assets/css/bootstrap.css";
import "./assets/css/style.css";
import "./assets/css/responsive.css";
import "./assets/css/default-theme.css";
import "./assets/css/skeleton.css";
import favicon from "./assets/images/favicon.png";

function setFavicon(url: string) {
  // Create a new link element
  const link = document.createElement("link");
  link.rel = "icon";
  link.type = "image/png"; // or 'image/x-icon' for .ico files
  link.href = url;

  // Remove the existing favicon if it exists
  let existingLink = document.querySelector('link[rel="icon"]');
  if (existingLink) {
    document.head.removeChild(existingLink);
  }

  existingLink = document.querySelector('link[rel="shortcut icon"]');
  if (existingLink) {
    document.head.removeChild(existingLink);
  }

  // Append the new favicon link to the head
  document.head.appendChild(link);
}
setFavicon(favicon);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
