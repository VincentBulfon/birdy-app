import React from "react";

export default function Header(props) {
  return (
    <div className="header_page">
      <h2 className="title_header">{props.title}</h2>
    </div>
  );
}
