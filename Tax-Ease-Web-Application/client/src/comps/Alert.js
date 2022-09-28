import React, { useEffect } from "react";

const Alert = ({ type, text, removeAlert }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      removeAlert();
    }, 1500);

    return () => clearTimeout(timeout);
  });

  return (
    <div className={`${type}`}>
      <h3 className="text-xs">{text}</h3>
    </div>
  );
};

export default Alert;
