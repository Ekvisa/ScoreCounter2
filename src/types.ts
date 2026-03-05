export type PlayerType = {
  id: string;
  name: string;
  rounds: (number | null)[];
};

export type GameState = "setup" | "playing" | "finished";
