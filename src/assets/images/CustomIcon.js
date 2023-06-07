import React from "react";
import plus from "./plus.png";

const CustomIcon = () => {
  return (
    <img
      src={plus}
      alt="Plus Icon"
      className="h-20"
      //   style={{ width: size, height: size }}
    />
  );
};

export default CustomIcon;
