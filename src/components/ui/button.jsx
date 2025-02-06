import React from "react";

function Button({ className, children, ...props }) {
  return (
    <button
      className={`px-4 py-2 rounded-md shadow-md ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
