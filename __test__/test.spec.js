import factory from "../dist/fightSimulator.umd";

import {
  formatModel,
  filterByGender,
  randomiseFight
} from "../src/modifiers"
import {
  groupBy
} from "../src/helpers"
import {
  justMen,
  justWomen,
  formattedModels,
  data
} from "./fixtures"

test("formatModel", () => {
  const modifiers = [formatModel]
  const value = factory({
    modifiers,
    data,
  });
  expect(value).toEqual(formattedModels);
});

test("gender filter, male", () => {
  const modifiers = [filterByGender(true)]
  const value = factory({
    modifiers,
    data,
  });
  expect(value).toEqual(justMen);
});

test("gender filter, female", () => {
  const modifiers = [filterByGender(false)]
  const value = factory({
    modifiers,
    data,
  });
  expect(value).toEqual(justWomen);
});

test("randomise fights", () => {
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