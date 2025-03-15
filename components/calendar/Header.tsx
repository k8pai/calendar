"use client";

import { addMonths, format, subMonths } from "date-fns";
import React from "react";

interface HeaderProps {
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
}

const Header: React.FC<HeaderProps> = ({ currentDate, setCurrentDate }) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-bold">{format(currentDate, "MMMM yyyy")}</h2>
      <div>
        <button
          className="px-3 py-1 bg-gray-200 rounded mr-2"
          onClick={() => setCurrentDate(subMonths(currentDate, 1))}
        >
          Prev
        </button>
        <button
          className="px-3 py-1 bg-gray-200 rounded"
          onClick={() => setCurrentDate(addMonths(currentDate, 1))}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Header;
