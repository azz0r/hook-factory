import factory from "../dist/fightSimulator.umd";

import { formatModel, genderFilter, randomiseFight } from "../src/modifiers"
import data from "./fixtures"

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
  const modifiers = [genderFilter(true)]
  const value = factory({
    modifiers,
    data: data.collection
  });
  const expectedValue = data.justMen

  expect(value).toEqual(expectedValue);
});

test("gender filter, female", () => {
  const modifiers = [genderFilter(false)]
  const value = factory({
    modifiers,
    data: data.collection
  });
  const expectedValue = data.justWomen

  expect(value).toEqual(expectedValue);
});

// test("randomise fights", () => {
//   const modifiers = [randomiseFight]
//   const value = factory({
//     modifiers,
//     data: data.collection
//   });
//   // const expectedValue = data.formattedModels
//   console.log(value);
//   // expect(value).toEqual(expectedValue);
// });