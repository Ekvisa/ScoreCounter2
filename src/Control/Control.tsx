import React from "react";
import { GameState } from "../types";

type ControlProps = {
  addRound: () => void;
  finishGame: () => void;
  resetGame: () => void;
  canEdit: boolean;
  gameState: GameState;
};

const Control = ({
  addRound,
  finishGame,
  resetGame,
  canEdit,
  gameState,
}: ControlProps) => {
  return (
    <div className="control">
      <button
        onClick={addRound}
        disabled={!canEdit || gameState === "finished"}
      >
        Add Round
      </button>
      <button
        onClick={finishGame}
        disabled={!canEdit || gameState === "finished"}
      >
        Finish
      </button>
      <button onClick={resetGame}>New Game</button>
    </div>
  );
};

export default Control;
