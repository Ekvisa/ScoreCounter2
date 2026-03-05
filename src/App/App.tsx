import React, { useState } from "react";
import Setup from "../Setup/Setup";
import Table from "../Table/Table";
import { PlayerType, GameState } from "../types";
import { sortByScore } from "../utils";

function App() {
  const [players, setPlayers] = useState<PlayerType[]>([]);
  const [gameState, setGameState] = useState<GameState>("setup");
  const [currentRoundIndex, setCurrentRoundIndex] = useState<number | null>(
    null,
  );

  const handleStart = (names: string[]) => {
    const newPlayers: PlayerType[] = names.map((name) => ({
      id: crypto.randomUUID(),
      name,
      rounds: [],
    }));
    setPlayers(newPlayers);
    setCurrentRoundIndex(null);
    setGameState("playing");
  };

  const addRound = () => {
    setPlayers((prev) =>
      prev.map((p) => ({ ...p, rounds: [...p.rounds, null] })),
    );
    setCurrentRoundIndex(players[0]?.rounds.length ?? 0);
  };

  const updateScore = (playerId: string, value: number | null) => {
    if (currentRoundIndex === null) return;
    setPlayers((prev) =>
      prev.map((p) =>
        p.id === playerId
          ? {
              ...p,
              rounds: p.rounds.map((r, i) =>
                i === currentRoundIndex ? value : r,
              ),
            }
          : p,
      ),
    );
  };

  const finishGame = () => {
    setPlayers((prev) => sortByScore(prev));
    setGameState("finished");
    setCurrentRoundIndex(null);
  };

  const resetGame = () => {
    setPlayers([]);
    setCurrentRoundIndex(null);
    setGameState("setup");
  };

  const allFilled = players.every(
    (p) => currentRoundIndex === null || p.rounds[currentRoundIndex] !== null,
  );

  return (
    <div className="App">
      {gameState === "setup" && <Setup onStart={handleStart} />}
      {gameState !== "setup" && (
        <Table
          players={players}
          updateScore={updateScore}
          addRound={addRound}
          finishGame={finishGame}
          resetGame={resetGame}
          currentRoundIndex={currentRoundIndex}
          allFilled={allFilled}
          gameState={gameState}
        />
      )}
    </div>
  );
}

export default App;
