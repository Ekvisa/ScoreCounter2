import React, { useState } from "react";
import { GameState } from "../types";
import "./Control.scss";

type ControlProps = {
  finishGame: () => void;
  resetScores: () => void;
  newGame: () => void;
  disabled: boolean;
  gameState: GameState;
};

const Control = ({
  finishGame,
  resetScores,
  newGame,
  disabled,
  gameState,
}: ControlProps) => {
  //   const [confirmFinish, setConfirmFinish] = useState<boolean>(false);

  return (
    <div className="control">
      {/* <button
        onClick={() => {
          if (!confirmFinish) {
            setConfirmFinish(true);
            return;
          }
          finishGame();
        }} 
      >*/}
      {/* {confirmFinish ? "Точно закончить?" : "Закончить игру"}
      </button> */}
      <button
        onClick={() => {
          window.confirm("Закончить игру?") && finishGame();
        }}
        disabled={disabled || gameState === "finished"}
      >
        Закончить игру
      </button>
      <button onClick={resetScores} disabled={gameState !== "finished"}>
        Сброс очков
      </button>
      <button onClick={newGame} disabled={gameState !== "finished"}>
        Новая игра
      </button>
    </div>
  );
};

export default Control;
