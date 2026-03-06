import React, { useState } from "react";
import Setup from "../Setup/Setup";
import Table from "../Table/Table";
import { PlayerType, GameState } from "../types";
import { sortByScore } from "../utils";
import "./App.scss";

function App() {
  const [players, setPlayers] = useState<PlayerType[]>([]);
  const [gameState, setGameState] = useState<GameState>("setup");

  const startGame = (names: string[]) => {
    const prepared = names.map((name) => ({
      id: crypto.randomUUID(),
      name,
      rounds: [],
    }));

    setPlayers(prepared);
    setGameState("playing");
  };

  const updateScore = (id: string, roundIndex: number, value: number) => {
    setPlayers((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              rounds: p.rounds.map((r, i) => (i === roundIndex ? value : r)),
            }
          : p,
      ),
    );
  };

  const addRound = () => {
    setPlayers((prev) =>
      prev.map((p) => ({
        ...p,
        rounds: [...p.rounds, null],
      })),
    );
  };

  const finishGame = () => {
    setPlayers((prev) => sortByScore(prev));
    setGameState("finished");
  };

  const resetScores = () => {
    setPlayers((prev) => prev.map((p) => ({ ...p, rounds: [] })));
    setGameState("playing");
  };

  const newGame = () => {
    setPlayers([]);
    setGameState("setup");
  };

  return (
    <div className="App">
      {gameState === "setup" && <Setup onStart={startGame} />}

      {gameState !== "setup" && (
        <Table
          players={players}
          updateScore={updateScore}
          addRound={addRound}
          finishGame={finishGame}
          resetScores={resetScores}
          newGame={newGame}
          gameState={gameState}
        />
      )}
    </div>
  );
}

export default App;
