import { EffectBasics } from "./Effect01";
import HeartButton from "./HeartButton";

export default function HookTest() {
  return (
    <div className="container">
      <div className="d-flex gap-2">
        <HeartButton /> click on the heart!
      </div>
      <EffectBasics />
    </div>
  );
}
