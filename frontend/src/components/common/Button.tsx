import React from "react";

interface ButtonProps {
  title: string;
  color?: string;
  type: "submit" | "button";
  onClick?: () => void;
  otherStyles?: string;
  disable?: boolean;
}
const Button: React.FC<ButtonProps> = ({
  title,

  onClick,
  type,
  disable,
  ...otherStyles
}) => {
  return (
    <div>
      <button
        onClick={onClick}
        disabled={disable}
        type={type}
        className={`${otherStyles}`}
      >
        {title}
      </button>
    </div>
  );
};

export default Button;
