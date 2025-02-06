import React from "react";

function Button({ className, children, ...props }) {
  return (
    <button
      className={`px-6 py-3 bg-gradient-to-r from-blue-500 to-green-400 text-white text-sm font-semibold tracking-wide uppercase rounded-2xl shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
