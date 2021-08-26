import React from "react";

const MediaInputBtn = ({ name, icon, style, className, accept }) => {
  return (
    <label htmlFor={name} style={style} className={className}>
      {" "}
      {icon}
      <input
        style={{ display: "none" }}
        type="file"
        name={name}
        id={name}
        accept={accept}
      />
    </label>
  );
};

export default MediaInputBtn;
