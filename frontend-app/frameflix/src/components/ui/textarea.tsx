import React from "react";

interface TextareaProps {
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder: string;
  className?: string;
  rows?: number;
}

const Textarea: React.FC<TextareaProps> = ({
  id,
  value,
  onChange,
  placeholder,
  className = "",
  rows = 4,
}) => {
  return (
    <textarea
      id={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full p-3 bg-slate-800 text-white border border-slate-700 rounded ${className}`}
      rows={rows}
    />
  );
};

export { Textarea };
export default Textarea;
