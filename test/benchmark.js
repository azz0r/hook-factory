import Benchmark from "benchmark";

import modifiers from "./modifiers";
import data from "./fixtures";
import factory from "../src";

const suite = new Benchmark.Suite();

suite
  .add("Factory", function() {
    try {
      factory({ data, modifiers });
    } catch (error) {
      console.log(error, "error");
    }
  })
  // .add(" - Second Factory - ", function() {
  //   try {
  //     second({ data, modifiers });
  //   } catch (error) {
  //     console.log(error, "error");
  //   }
  // })
  .on("cycle", function(event) {
    console.log(String(event.target));
  })
  .on("complete", function() {
    console.log("Fastest is " + this.filter("fastest").map("name"));
  })
  .run({ async: true });

  export default suite;
