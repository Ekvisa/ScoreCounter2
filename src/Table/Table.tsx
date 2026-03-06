import React from "react";
import { PlayerType, GameState } from "../types";
import Player from "../Player/Player";
import Control from "../Control/Control";
import { countPlayerTotal, getMaxScore } from "../utils";
import "./Table.scss";

type TableProps = {
  players: PlayerType[];
  updateScore: (id: string, roundIndex: number, value: number) => void;
  addRound: () => void;
  finishGame: () => void;
  resetScores: () => void;
  newGame: () => void;

  gameState: GameState;
};

function Table({
  players,
  updateScore,
  addRound,
  finishGame,
  resetScores,
  newGame,
  gameState,
}: TableProps) {
  const roundsCount = players[0]?.rounds.length ?? 0;
  const currentRound = roundsCount - 1;

  const hasEmpty = players.some((p) => p.rounds.includes(null));

  const maxScore = getMaxScore(players);

  const tableWrap = document.querySelector(".tableWrapper");
  if (tableWrap) {
    tableWrap.scrollLeft = tableWrap.scrollWidth;
  }

  return (
    <div className="scene">
      <div className="tableWrapper">
        <table>
          <thead>
            <tr>
              <th>Игроки</th>
              {Array.from({ length: roundsCount }).map((_, i) => (
                <th key={i}>Кон {i + 1}</th>
              ))}
              <th>
                <button //Add round
                  onClick={addRound}
                  disabled={hasEmpty || gameState === "finished"}
                >
                  +
                </button>
              </th>
              <th>Итог</th>
            </tr>
          </thead>

          <tbody>
            {players.map((p) => (
              <Player
                key={p.id}
                player={p}
                currentRound={currentRound}
                updateScore={updateScore}
                isLeader={countPlayerTotal(p) === maxScore}
                gameState={gameState}
              />
            ))}
          </tbody>
        </table>
      </div>
      <Control
        finishGame={finishGame}
        resetScores={resetScores}
        newGame={newGame}
        disabled={hasEmpty}
        gameState={gameState}
      />
    </div>
  );
}

export default Table;
