import factory from "../dist/fightSimulator.umd";

import {
  genderFilter,
  formatModel
} from "../src/modifiers"
import data from "./fixtures"

test("test parantheses pairs with different cases", () => {
  const modifiers = [formatModel]
  const value = factory({
    modifiers,
    data: data.collection
  });
  const expectedValue = data.formattedModels

  expect(value).toEqual(expectedValue);
});

test("test parantheses pairs with different cases", () => {
  const modifiers = [genderFilter("male")]
  const value = factory({
    modifiers,
    data: data.collection
  });
  const expectedValue = data.justMen

  expect(value).toEqual(expectedValue);
});