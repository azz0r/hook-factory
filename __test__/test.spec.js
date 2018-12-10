import factory from "../dist/fightSimulator.umd";

import { formatModel, filterByGender, randomiseFight } from "../src/modifiers"
import data from "./fixtures"

const groupBy = (objectArray, property) => {
  return objectArray.reduce((acc, obj) => {
    var key = obj[property];
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(obj);
    return acc;
  }, {});
}

test("formatModel", () => {
  const modifiers = [formatModel]
  const value = factory({
    modifiers,
    data: data.collection
  });
  const expectedValue = data.formattedModels

  expect(value).toEqual(expectedValue);
});

test("gender filter, male", () => {
  const modifiers = [filterByGender(true)]
  const value = factory({
    modifiers,
    data: data.collection
  });
  const expectedValue = data.justMen

  expect(value).toEqual(expectedValue);
});

test("gender filter, female", () => {
  const modifiers = [filterByGender(false)]
  const value = factory({
    modifiers,
    data: data.collection
  });
  const expectedValue = data.justWomen

  expect(value).toEqual(expectedValue);
});

test("randomise fights", () => {
  const modifiers = [randomiseFight()]
  const value = factory({
    modifiers,
    data: data.collection
  });
  const groupedByTeamId = groupBy(value, 'teamId')
  const teams = Object.keys(groupedByTeamId).length

  expect(teams).toBeGreaterThan(1);
  expect(value[0].male).toBe(true);
  expect(value[1].male).toBe(true);
});