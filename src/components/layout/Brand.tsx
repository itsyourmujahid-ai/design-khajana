"use client";

import Link from "next/link";

export function Brand() {
  return (
    <Link href="/" className="group flex items-center gap-3" aria-label="Design Khajana">
      <div className="relative flex h-10 w-10 items-center justify-center transition-transform duration-300 group-hover:scale-105">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 400 400"
          className="h-full w-full"
          preserveAspectRatio="xMidYMid meet"
        >
          <text
            x="50%"
            y="50%"
            dominantBaseline="central"
            textAnchor="middle"
            fontFamily="'Century Gothic', sans-serif"
            fontWeight="bold"
            fontStyle="italic"
            fontSize="280"
            letterSpacing="-25"
          >
            <tspan className="logo-d transition-colors duration-300">d</tspan>
            <tspan fill="#F2A900">K</tspan>
          </text>
        </svg>
      </div>
      <span className="brand-text font-display text-[17px] font-bold leading-none transition-colors duration-300">
        Design <span className="text-gradient">Khajana</span>
      </span>
    </Link>
  );
}
