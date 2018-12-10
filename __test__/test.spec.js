import factory from "../dist/fightSimulator.umd";

import {
  addPointsToModel,
  addTeamIdToModel,
  filterByGender,
  randomiseFight,
  randomiseResults,
} from "./modifiers"
import {
  groupBy
} from "./helpers"
import {
  justMen,
  justWomen,
  pointsModels,
  teamIdsModels,
  data
} from "./fixtures"

test("addPointsToModel", () => {
  const modifiers = [addPointsToModel]
  const value = factory({
    modifiers,
    data,
  });
  expect(value).toEqual(pointsModels);
});

test("addTeamIdToModel", () => {
  const modifiers = [addTeamIdToModel]
  const value = factory({
    modifiers,
    data,
  });
  expect(value).toEqual(teamIdsModels);
});

test("filterByGender male", () => {
  const modifiers = [filterByGender(true)]
  const value = factory({
    modifiers,
    data,
  });
  expect(value).toEqual(justMen);
});

test("filterByGender female", () => {
  const modifiers = [filterByGender(false)]
  const value = factory({
    modifiers,
    data,
  });
  expect(value).toEqual(justWomen);
});

test("randomiseFight", () => {
  const modifiers = [randomiseFight()]
  const value = factory({
    modifiers,
    data,
  });
  const groupedByTeamId = groupBy(value, 'teamId')
  const teams = Object.keys(groupedByTeamId).length

  expect(teams).toBeGreaterThan(1);
  expect(value[0].male).toBe(true);
  expect(value[1].male).toBe(true);
});

test("randomiseResults", () => {
  const modifiers = [addPointsToModel, addTeamIdToModel, randomiseFight(), randomiseResults()]
  const value = factory({
    modifiers,
    data,
  });

  const hasAWinner = value.filter(item => item.winner).length > 0
  expect(hasAWinner).toBe(true)
});