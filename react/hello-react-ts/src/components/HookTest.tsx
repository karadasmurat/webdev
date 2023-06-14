import { useState } from "react";
import { EffectBasics } from "./Effect01";
import HeartButton from "./HeartButton";

export default function HookTest() {
  const [info, setInfo] = useState("");
  function handleSelect(isSelected: boolean) {
    setInfo(
      isSelected ? "processing on state ..." : "processing off state ..."
    );
  }

  return (
    <div className="container">
      <div className="d-flex gap-2">
        <HeartButton onSelect={handleSelect} /> click on the heart!
      </div>
      <div className="card text-bg-dark m-2 p-2">
        <div className="card-header">Log</div>
        <div className="card-body">{info}</div>
      </div>
      <EffectBasics />
    </div>
  );
}
