import MatchModel from '../database/models/MatchModel';

const homePoints = (acc: number, curr: MatchModel):
number => {
  if (curr.homeEquipGoals > curr.awayEquipGoals) return acc + 3;
  if (curr.homeEquipGoals === curr.awayEquipGoals) return acc + 1;
  return acc;
};

const homeWins = (acc: number, curr: MatchModel):
number => {
  if (curr.homeEquipGoals > curr.awayEquipGoals) return acc + 1;
  return acc;
};

const table = (acc: number, curr: MatchModel): number => {
  if (curr.homeEquipGoals === curr.awayEquipGoals) return acc + 1;
  return acc;
};

const homeDefeats = (acc: number, curr: MatchModel): number => {
  if (curr.homeEquipGoals < curr.awayEquipGoals) return acc + 1;
  return acc;
};

const homeScoreFavor = (acc: number, curr: MatchModel):
number => acc + curr.homeEquipGoals;

const homeScoreOwn = (acc: number, curr: MatchModel):
number => acc + curr.awayEquipGoals;

const awayPoints = (acc: number, curr: MatchModel):
number => {
  if (curr.homeEquipGoals < curr.awayEquipGoals) return acc + 3;
  if (curr.homeEquipGoals === curr.awayEquipGoals) return acc + 1;
  return acc;
};

const awayWins = (acc: number, curr: MatchModel):
number => {
  if (curr.homeEquipGoals < curr.awayEquipGoals) return acc + 1;
  return acc;
};

const awayDefeats = (acc: number, curr: MatchModel):
number => {
  if (curr.homeEquipGoals > curr.awayEquipGoals) return acc + 1;
  return acc;
};

const awayScoreFavor = (acc: number, curr: MatchModel):
number => acc + curr.awayEquipGoals;

const awayScoreOwn = (acc: number, curr: MatchModel):
number => acc + curr.homeEquipGoals;

export { homePoints, homeWins, table,
  homeDefeats, homeScoreFavor, homeScoreOwn,
  awayPoints, awayWins, awayDefeats,
  awayScoreFavor, awayScoreOwn };
