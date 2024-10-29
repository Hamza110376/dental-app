"use client";

import React, { useState } from "react";
import { Info } from "lucide-react";

const toothPaths = {
  molar:
    "M10 90 C10 50, 20 20, 50 10 C80 20, 90 50, 90 90 C70 95, 30 95, 10 90",
  premolar:
    "M25 90 C25 60, 30 30, 50 10 C70 30, 75 60, 75 90 C60 95, 40 95, 25 90",
  canine:
    "M40 90 C40 70, 40 30, 50 10 C60 30, 60 70, 60 90 C55 95, 45 95, 40 90",
  incisor:
    "M35 90 C35 70, 40 30, 50 10 C60 30, 65 70, 65 90 C55 95, 45 95, 35 90",
};

const Tooth = ({ number, type, isUpper, isSelected, onClick }) => (
  <div className="flex flex-col items-center" onClick={onClick}>
    <svg
      viewBox="0 0 100 100"
      className={`w-12 h-12 ${
        isUpper ? "" : "rotate-180"
      } cursor-pointer hover:drop-shadow-md transition-all`}
    >
      <path
        d={toothPaths[type]}
        className={`stroke-gray-400 ${
          isSelected ? "fill-yellow-200" : "fill-gray-100"
        }`}
        strokeWidth="2"
      />
    </svg>
    <span className="text-xs mt-1">{number}</span>
  </div>
);

const upperTeeth = [
  { number: 18, type: "molar" },
  { number: 17, type: "molar" },
  { number: 16, type: "molar" },
  { number: 15, type: "premolar" },
  { number: 14, type: "premolar" },
  { number: 13, type: "canine" },
  { number: 12, type: "incisor" },
  { number: 11, type: "incisor" },
  { number: 21, type: "incisor" },
  { number: 22, type: "incisor" },
  { number: 23, type: "canine" },
  { number: 24, type: "premolar" },
  { number: 25, type: "premolar" },
  { number: 26, type: "molar" },
  { number: 27, type: "molar" },
  { number: 28, type: "molar" },
];

const lowerTeeth = [
  { number: 48, type: "molar" },
  { number: 47, type: "molar" },
  { number: 46, type: "molar" },
  { number: 45, type: "premolar" },
  { number: 44, type: "premolar" },
  { number: 43, type: "canine" },
  { number: 42, type: "incisor" },
  { number: 41, type: "incisor" },
  { number: 31, type: "incisor" },
  { number: 32, type: "incisor" },
  { number: 33, type: "canine" },
  { number: 34, type: "premolar" },
  { number: 35, type: "premolar" },
  { number: 36, type: "molar" },
  { number: 37, type: "molar" },
  { number: 38, type: "molar" },
];

export default function DentalChart() {
  const [selectedTeeth, setSelectedTeeth] = useState([]);

  const toggleTooth = (toothNumber) => {
    setSelectedTeeth((prev) =>
      prev.includes(toothNumber)
        ? prev.filter((n) => n !== toothNumber)
        : [...prev, toothNumber]
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Dental Chart</h1>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex gap-0 mb-2">
          {upperTeeth.map((tooth) => (
            <Tooth
              key={tooth.number}
              number={tooth.number}
              type={tooth.type}
              isUpper={true}
              isSelected={selectedTeeth.includes(tooth.number)}
              onClick={() => toggleTooth(tooth.number)}
            />
          ))}
        </div>
        <div className="flex gap-1">
          {lowerTeeth.map((tooth) => (
            <Tooth
              key={tooth.number}
              number={tooth.number}
              type={tooth.type}
              isUpper={false}
              isSelected={selectedTeeth.includes(tooth.number)}
              onClick={() => toggleTooth(tooth.number)}
            />
          ))}
        </div>
      </div>
      <div className="mt-6 p-4 bg-gray-100 rounded-lg">
        <h2 className="text-lg font-semibold flex items-center mb-2">
          <Info className="w-5 h-5 mr-2" />
          Tooth Numbering System
        </h2>
        <p className="text-sm text-gray-600">
          This chart uses the FDI World Dental Federation notation. The mouth is
          divided into four quadrants, and each tooth is given a two-digit
          number. The first digit (1-4) represents the quadrant, and the second
          digit (1-8) represents the tooth's position from the center.
        </p>
      </div>
    </div>
  );
}
