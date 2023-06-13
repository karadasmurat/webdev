import { BsHeart, BsHeartFill } from "react-icons/bs";
import useToggle from "../hooks/useToggle";

export default function HeartButton() {
  // use custom hook to help conditional rendering
  const { condition, toggle } = useToggle();

  return (
    <div>
      {condition ? (
        <BsHeartFill onClick={toggle} style={{ color: "pink" }} />
      ) : (
        <BsHeart onClick={toggle} />
      )}
    </div>
  );
}
