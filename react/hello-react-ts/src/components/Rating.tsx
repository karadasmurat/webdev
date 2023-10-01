import { useState } from "react";
import { FaHeart } from "react-icons/fa";

export default function RatingDemo() {
  return <RatingBar initialScore={0} scale={5} />;
}

type RatingBarProps = {
  initialScore: number;
  scale: number;
};

function RatingBar({ initialScore = 0, scale }: RatingBarProps) {
  //   console.log(Array(scale));

  const [rscore, setRscore] = useState(initialScore);

  function handleSelect() {
    // console.log("selected!");
    setRscore((prevScore) => prevScore + 1);
  }

  return (
    <>
      <div className="d-flex gap-1">
        {/* // create an array of n elements, to map to rating components. */}
        {Array(scale)
          .fill(0)
          .map((element, index) => (
            <Rating
              key={index}
              isOn={rscore > index ? true : false}
              onSelect={() => setRscore(index + 1)}
            />
          ))}
      </div>
      <p>
        {rscore} of {scale} stars
      </p>
    </>
  );
}

type RatingProps = {
  isOn: boolean;
  onSelect: () => void;
};

// "passive" component
// decorate itself and "report" clicks using callback provided by props. (Sending interaction back up)
function Rating({ isOn, onSelect }: RatingProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseOver = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  return (
    <FaHeart
      color={isOn || isHovered ? "pink" : "gray"}
      style={{
        borderBottom: isHovered ? "2px solid gold" : "none",
        cursor: isHovered ? "pointer" : "none",
      }}
      onClick={onSelect}
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
    />
  );
}
