"use client";

import { Star } from "lucide-react";

type RatingInputProps = {
  value: number;
  onChange: (value: number) => void;
};

export function RatingInput({ value, onChange }: RatingInputProps) {
  return (
    <div className="flex items-center justify-end gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          aria-label={`${star} 星`}
          onClick={() => onChange(star)}
          className="text-gold"
        >
          <Star className="h-7 w-7" fill={star <= value ? "currentColor" : "transparent"} />
        </button>
      ))}
      <span className="ml-1 min-w-7 text-base text-gold">{value.toFixed(1)}</span>
    </div>
  );
}
