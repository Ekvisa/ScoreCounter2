import React from "react";
import ScoreCell from "../ScoreCell/ScoreCell";
import { PlayerType } from "../types";
import { countPlayerTotal } from "../utils";

type PlayerRowProps = {
  player: PlayerType;
  updateScore: (playerId: string, value: number | null) => void;
  currentRoundIndex: number | null;
  isLeader: boolean;
};

const PlayerRow = ({
  player,
  updateScore,
  currentRoundIndex,
  isLeader,
}: PlayerRowProps) => {
  const total = countPlayerTotal(player);
  const totalPending = player.rounds.some((r) => r === null);

  return (
    <tr className={isLeader ? "leader" : ""}>
      <td>{player.name}</td>
      {player.rounds.map((r, i) => (
        <td key={i}>
          <ScoreCell
            value={r}
            onSave={(value) => updateScore(player.id, value)}
            editable={i === currentRoundIndex}
          />
        </td>
      ))}
      <td style={{ color: totalPending ? "grey" : "black" }}>{total}</td>
    </tr>
  );
};

export default PlayerRow;
