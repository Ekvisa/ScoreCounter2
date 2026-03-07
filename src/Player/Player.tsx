import React from "react";
import ScoreCell from "../ScoreCell/ScoreCell";
import { GameState, PlayerType } from "../types";
import { countPlayerTotal } from "../utils";
import "./Player.css";

type PlayerProps = {
  player: PlayerType;
  currentRound: number;

  updateScore: (id: string, roundIndex: number, value: number) => void;

  isLeader: boolean;
  gameState: GameState;
};

function Player({
  player,
  currentRound,
  updateScore,
  isLeader,
  gameState,
}: PlayerProps) {
  return (
    <tr className={isLeader ? "leader" : ""}>
      <td>
        {player.name}
        {isLeader && gameState === "finished" && " 🎉"}
      </td>

      {gameState !== "finished" &&
        player.rounds.map((r, i) => (
          <td key={i}>
            <ScoreCell
              value={r}
              editable={i === currentRound && gameState === "playing"}
              onSave={(v) => updateScore(player.id, i, v ?? 0)}
            />
          </td>
        ))}
      <td></td>

      <td>{countPlayerTotal(player)}</td>
    </tr>
  );
}

export default Player;
