import { BsHeart, BsHeartFill } from "react-icons/bs";
import useToggle from "../hooks/useToggle";
interface HeartButtonProps {
  onSelect: (status: boolean) => void;
}
export default function HeartButton({ onSelect }: HeartButtonProps) {
  // use custom hook to help conditional rendering
  const { condition, toggle } = useToggle();

  function handleClick() {
    toggle();

    // Notice async behaviour of updating state:
    // We use !conditionn as if we have not just called toggle()
    onSelect(!condition);
  }

  return (
    <div>
      {condition ? (
        <BsHeartFill onClick={handleClick} style={{ color: "pink" }} />
      ) : (
        <BsHeart onClick={handleClick} />
      )}
    </div>
  );
}
