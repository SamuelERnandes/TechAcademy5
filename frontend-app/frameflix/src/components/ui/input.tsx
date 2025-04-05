import React from "react";

function Input({
  type = "text",
  placeholder,
  value,
  onChange,
}: {
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border border-gray-300 rounded p-2"
    />
  );
}
export default Input;
