import React from "react";

const MediaInputBtn = ({ name, icon, style, className, accept, onChange }) => {
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
        onChange={onChange}
      />
    </label>
  );
};

export default MediaInputBtn;
