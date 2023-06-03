import { useState } from "react";

export default function ObjectState() {
  // state which contains a nested object structure
  const [game, setGame] = useState({
    id: 1,
    player: { name: "John", nick: "Crawler", power: 90 },
    levels: ["gold", "silver"],
  });

  function handleChange(e) {
    const newNick = e.target.value;

    // update state, with a NEW OBJECT.
    // keep all other properties, update "player" property, which is an object
    setGame({ ...game, player: { ...game["player"], nick: newNick } });
  }

  function handleClick(e) {
    console.log("clicked.");

    // update state with a NEW OBJECT.
    // keep all other properties, update "levels" property, which is an array
    setGame({
      ...game,
      levels: [...game.levels, Math.floor(Math.random() * 10)],
    });
  }

  return (
    <>
      <div className="card mb-3" style={{ width: "18rem" }}>
        <div className="card-body">
          <h5 className="card-title">{game.player.nick}</h5>
          <h6 className="card-subtitle mb-2 text-body-secondary">
            {game.player.name} | {game.player.power}
          </h6>
          <p className="card-text">
            <ul>
              {" "}
              {game.levels.map((level) => (
                <li>{level}</li>
              ))}
            </ul>
          </p>
        </div>
      </div>

      <div className="form-floating mb-3">
        <input
          type="text"
          class="form-control"
          id="floatingInput"
          placeholder="nick"
          onChange={handleChange}
          value={game.player.nick}
          required
        />
        <label for="floatingInput">Nick</label>
      </div>

      <button onClick={handleClick} className="btn btn-primary">
        Add a random level
      </button>
    </>
  );
}
