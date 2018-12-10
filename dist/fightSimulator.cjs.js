'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var weighted = _interopDefault(require('weighted'));

const factory = function ({
  data = {},
  modifiers = []
}) {
  let props = JSON.parse(JSON.stringify(data));
  const prehooks = modifiers.reduce((result, modifier) => {
    if (modifier.prehook) {
      result.push(modifier.prehook);
    }
    return result;
  }, []);
  const posthooks = modifiers.reduce((result, modifier) => {
    if (modifier.posthook) {
      result.push(modifier.posthook);
    }
    return result;
  }, []);

  if (prehooks) {
    prehooks.forEach(prehook => (props = prehook(props)));
  }
  if (posthooks) {
    posthooks.forEach(posthook => (props = posthook(props)));
  }
  return props;
};

const defaultOptions = {
    male: {
      options: [true, false,],
      weights: [0.8, 0.2,],
    },
    amount: {
      options: [2, 3, 4, 5, 6,],
      weights: [0.5, 0.1, 0.1, 0.1, 0.1,],
    },
    tag: {
      options: [true, false,],
      weights: [0.5, 0.5,],
      perTeam: 2,
    },
  };
  
  const randomiseFight = (options = defaultOptions) => ({
    prehook: data => {
      const getWrestlerWeights = length => new Array(length).fill(1 / length);
      const chooseRandomWrestler = wrestlers => weighted.select(wrestlers, getWrestlerWeights(wrestlers.length));
  
      const result = [];
      const { tag, amount, male, } = options;
      let noWrestlers = weighted.select(amount.options, amount.weights);
  
      const gender = weighted.select(male.options, male.weights) ? "male": "female";
      const isTagMatch = weighted.select(tag.options, tag.weights);
  
      let wrestlers = data.filter(wrestler => wrestler.gender === gender);
  
      if (isTagMatch) {
        noWrestlers = noWrestlers * noWrestlers;
      }
  
      let teamId = 0,
        perTeam = 0;
      while (noWrestlers > 0 && wrestlers.length > 0) {
        wrestlers = wrestlers.filter(wrestler => !ids.includes(wrestler.id));
        const chosenWrestler = chooseRandomWrestler(wrestlers);
        if (isTagMatch) {
          if (perTeam === tag.perTeam) {
            perTeam = 0;
            teamId++;
          }
          chosenWrestler.teamId = teamId;
        } else {
          chosenWrestler.teamId = teamId++;
        }
  
        wrestlers = wrestlers.filter(wrestler => wrestler.id !== chosenWrestler.id);
        result.push(chosenWrestler);
  
        perTeam++;
        noWrestlers--;
      }
      return result
    }
  });

const genderFilter = gender => ({  
    posthook: data => data.filter(item => item.male === Boolean(gender))
});

const formatModel = {
    prehook: data => data.map(item => Object.assign({}, {
        points: 100
    }, item)),
};



var index = /*#__PURE__*/Object.freeze({
  randomiseFight: randomiseFight,
  genderFilter: genderFilter,
  formatModel: formatModel
});

exports.factory = factory;
exports.modifiers = index;
exports.default = factory;
