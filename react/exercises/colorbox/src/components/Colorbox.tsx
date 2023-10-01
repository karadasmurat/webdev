import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";

export default function Colorbox() {
  const [selectedColor, setSelectedColor] = useState("");
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "200px",
          height: "200px",
          border: "1px solid black",
          borderRadius: "5px",
          backgroundColor: selectedColor,
          margin: "10px 0px",
        }}
      >
        {selectedColor ? selectedColor : "Empty value"}
      </div>

      <input
        type="text"
        name="color"
        id="color"
        value={selectedColor}
        onChange={(e) => setSelectedColor(e.target.value)}
        placeholder="Add color name"
        autoFocus
      />
    </>
  );
}
