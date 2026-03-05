import React from "react";
import { PlayerType, GameState } from "../types";
import Player from "../Player/Player";
import Control from "../Control/Control";
import { countPlayerTotal, getMaxScore } from "../utils";

type TableProps = {
  players: PlayerType[];
  updateScore: (playerId: string, value: number | null) => void;
  addRound: () => void;
  finishGame: () => void;
  resetGame: () => void;
  currentRoundIndex: number | null;
  allFilled: boolean;
  gameState: GameState;
};

const Table = ({
  players,
  updateScore,
  addRound,
  finishGame,
  resetGame,
  currentRoundIndex,
  allFilled,
  gameState,
}: TableProps) => {
  const maxScore = getMaxScore(players);

  return (
    <div className="table">
      <table>
        <thead>
          <tr>
            <th>Players</th>
            {players[0]?.rounds.map((_, i) => (
              <th key={i}>{`Round #${i + 1}`}</th>
            ))}
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {players.map((p) => (
            <Player
              key={p.id}
              player={p}
              updateScore={updateScore}
              currentRoundIndex={currentRoundIndex}
              isLeader={countPlayerTotal(p) === maxScore}
            />
          ))}
        </tbody>
      </table>
      <Control
        addRound={addRound}
        finishGame={finishGame}
        resetGame={resetGame}
        canEdit={allFilled}
        gameState={gameState}
      />
    </div>
  );
};

export default Table;
