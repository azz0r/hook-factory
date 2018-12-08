import http from "http";

import factory from "./src/index";
import modifiers from "./test/modifiers";
import data from "./fixtures";

http
  .createServer((req, res) => {
    try {
      factory({ modifiers, data });
    } catch (error) {
      console.log(error);
    }
  })
  .listen(1337, "127.0.0.1");

console.log("Server running");
