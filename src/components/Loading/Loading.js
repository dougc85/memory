import React from "react";
import "./Loading.scss";

function Loading() {
  return (
    <div className="Loading">
      <div className="Loading-ring">
        <div className="Loading-center"></div>
      </div>
      <p className="Loading-word">Loading</p>
    </div>
  )
}

export default Loading;