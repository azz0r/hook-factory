var Benchmark = require("benchmark");

const first = function({ data = {}, modifiers = [] }) {
  let props = JSON.parse(JSON.stringify(data));
  const prehooks = function(props) {
    modifiers.forEach(modifier => (props = modifier.prehook(props)));
  };
  const posthooks = function(props) {
    modifiers.forEach(modifier => (props = modifier.posthook(props)));
  };
  prehooks(props);
  posthooks(props);
  return props;
};

const second = function({ data = {}, modifiers = [] }) {
  let props = JSON.parse(JSON.stringify(data));
  const prehooks = modifiers.map(modifier => modifier.prehook);
  const posthooks = modifiers.map(modifier => modifier.posthook);

  prehooks.forEach(prehook => (props = prehook(props)));
  posthooks.forEach(posthook => (props = posthook(props)));
  return props;
};

const data = [
  {
    name: "Jimmy",
    id: 1
  },
  {
    name: "Johnny",
    id: 2
  }
];

const modifier = {
  prehook: data => data.map(item => Object.assign({}, { points: 100 }, item)),
  posthook: data =>
    data.map(item => Object.assign({}, item, { id: String(item.id) }))
};

const modifiers = [modifier];

const suite = new Benchmark.Suite();

suite
  .add(" ; First Factory ; ", function() {
    try {
      first({ data, modifiers });
    } catch (error) {
      console.log(error, "error");
    }
  })
  .add(" - Second Factory - ", function() {
    try {
      second({ data, modifiers });
    } catch (error) {
      console.log(error, "error");
    }
  })
  .on("cycle", function(event) {
    console.log(String(event.target));
  })
  .on("complete", function() {
    console.log("Fastest is " + this.filter("fastest").map("name"));
  })
  .run({ async: true });
