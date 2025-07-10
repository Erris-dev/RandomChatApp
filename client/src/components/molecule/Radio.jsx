import { useState } from "react";

const Radio = ({ label = "Gender", value, onChange }) => {
  const genders = ["Male", "Female"];

  return (
    <div className="w-full max-w-md">
      <label className="text-lg font-bold mb-2 block">{label}:</label>
      <div className="flex gap-4">
        {genders.map((gender) => (
          <label
            key={gender}
            className={`
              flex items-center justify-center gap-2 px-6 py-3 rounded-md border 
              border-[#b3b3d1] bg-white cursor-pointer w-full text-gray-500
              transition-all
              ${value === gender ? "border-blue-500 bg-blue-50 text-blue-700" : ""}
            `}
          >
            <input
              type="radio"
              name="gender"
              value={gender}
              checked={value === gender}
              onChange={() => onChange(gender)}
              className="hidden"
            />
            <span
              className={`
                w-4 h-4 rounded-full border border-[#b3b3d1] flex items-center justify-center
                ${value === gender ? "border-blue-500" : ""}
              `}
            >
              {value === gender && <div className="w-2 h-2 bg-blue-500 rounded-full" />}
            </span>
            <span className="text-base">{gender}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default Radio ;
