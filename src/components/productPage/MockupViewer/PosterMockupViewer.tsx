// src/components/productPage/MockupViewer/PosterMockupViewer.tsx
"use client";

import React from "react";

const mockups = [
  {
    id: "mockup1",
    src: "/images/staticMockups/staticMockup1.jpeg", // update with your path
    mockupPosition: "60%", // shift it downward
    defaultTop: 35,
    defaultLeft: 50,
    defaultWidth: 160,
  },
  {
    id: "mockup2",
    src: "/images/staticMockups/staticMockup2.jpeg",
    mockupPosition: "50%", // shift it downward
    defaultTop: 31.5,
    defaultLeft: 55,
    defaultWidth: 160,
  },
  {
    id: "mockup3",
    src: "/images/staticMockups/staticMockup3.jpeg",
    mockupPosition: "60%", // shift it downward
    defaultTop: 33,
    defaultLeft: 40,
    defaultWidth: 170,
  },
];

interface PosterMockupViewerProps {
  posterUrl: string; // the actual poster image URL
  selectedDimensions: string; // e.g. "12x18"
  activeMockupIndex: number;
  onMockupChange: (newIndex: number) => void;
}

export default function PosterMockupViewer({
  posterUrl,
  selectedDimensions,
  activeMockupIndex,
  onMockupChange,
}: PosterMockupViewerProps) {
  const activeMockup = mockups[activeMockupIndex];
  const scale = getScaleFactor(selectedDimensions);

  const dimensionScale = getScaleFactor(selectedDimensions);

  return (
    <div className="relative flex flex-col-reverse lg:flex-row gap-4">
      {/* Thumbnails for switching static mockups */}

      <div className="absolute flex bottom-2 left-2 gap-2 z-20 bg-white/20 p-2 rounded-md shadow lg:flex-col lg:bottom-auto lg:top-4">
        {mockups.map((mockup, idx) => (
          <button
            key={mockup.id}
            onClick={() => onMockupChange(idx)}
            className={`border p-1 rounded ${
              idx === activeMockupIndex ? "border-blue-500" : "border-gray-300"
            }`}
          >
            <div className="relative w-16 h-16 overflow-hidden rounded">
              <img
                src={mockup.src}
                alt={`Mockup ${mockup.id}`}
                className=""
                style={{
                  height: "100%",
                  objectFit: "cover",
                }}
              />
              {/* Overlay poster inside thumbnail */}
              <img
                src={posterUrl}
                alt="Poster Thumbnail"
                className="absolute"
                style={{
                  top: `${mockup.defaultTop}%`,
                  left: `${mockup.defaultLeft}%`,
                  transform: "translate(-50%, -50%)",
                  width: `${mockup.defaultWidth * 0.15}px`,
                  height: "auto",
                  zIndex: 10,
                  boxShadow: "-1px 1px 2px rgba(0,0,0,0.3)",
                }}
              />
            </div>
          </button>
        ))}
      </div>

      {/* Main mockup area */}
      <div className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] bg-gray-100 rounded-lg overflow-hidden">
        {/* Static mockup background */}
        <img
          src={activeMockup.src}
          alt="Mockup background"
          className="absolute top-0 left-0 w-full h-full object-cover"
          style={{
            objectPosition: activeMockup.mockupPosition,
          }}
        />

        {/* Poster image overlaid */}
        <img
          src={posterUrl}
          alt="Poster"
          className="absolute transition-all duration-300 ease-in-out"
          style={{
            top: `${activeMockup.defaultTop}%`,
            left: `${activeMockup.defaultLeft}%`,
            transformOrigin: "center",
            transform: "translate(-50%, -50%)",
            zIndex: 10,
            boxShadow: "-3px 3px 2px rgba(0,0,0,0.3)",
            width: `${activeMockup.defaultWidth * getScaleFactor(selectedDimensions)}px`,
            height: "auto",
          }}
        />
      </div>
    </div>
  );
}

function getScaleFactor(dimensions: string): number {
  switch (dimensions) {
    case "12x18":
      return 1.0;
    case "18x24":
      return 1.3;
    case "24x36":
      return 1.6;
    default:
      return 1.0;
  }
}
