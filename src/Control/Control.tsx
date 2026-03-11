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
  return (
    <div className="control">
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
