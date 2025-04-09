import React from "react";

interface RatingProps {
  value: number;
  onChange: (newValue: number) => void;
}

const Rating: React.FC<RatingProps> = ({ value, onChange }) => {
  return (
    <div className="flex items-center justify-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          className={`p-1 ${
            value >= star ? "text-yellow-400" : "text-slate-600"
          }`}
        >
          ★
        </button>
      ))}
    </div>
  );
};

export { Rating };
export default Rating;
