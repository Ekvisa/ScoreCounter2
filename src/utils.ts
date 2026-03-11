import { PlayerType } from "./types";

export const countPlayerTotal = (p: PlayerType) => {
  return p.rounds.reduce<number>((acc, r) => acc + (r ?? 0), 0);
};

export const getMaxScore = (players: PlayerType[]) =>
  Math.max(...players.map(countPlayerTotal), 0);

export const sortByScore = (players: PlayerType[]) =>
  [...players].sort((a, b) => countPlayerTotal(b) - countPlayerTotal(a));
