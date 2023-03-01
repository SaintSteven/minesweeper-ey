import React from 'react'

export default function Minefield() {
  const gridStyle = "grid grid-cols-10 gap-1 h-96 w-96 flex justify-center";
  const cellStyle = "bg-gray-400 h-8 w-8 items-center justify-center border border-gray-500";

  const grid = Array(100).fill().map((_, i) => (
    <div key={i} className={cellStyle}></div>
  ));

  return (
    <div className={gridStyle}>
      {grid}
    </div>
  );
}
