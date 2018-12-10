(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.fightSimulator = {})));
}(this, (function (exports) { 'use strict';

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

  function getTotal(weights) {
    var total = weights.__weighted_total;

    if (total != null) {
      return total
    }

    function wrap(arr, fn) {
      return function () {
        arr.__weighted_total = null;
        fn.apply(arr, arguments);
      }
    }

    if (total === undefined) {
  ['pop', 'push', 'shift', 'unshift', 'splice'].forEach(function (key) {
        weights[key] = wrap(weights, weights[key]);
      });
    }

    total = weights.__weighted_total = weights.reduce(function (prev, curr) {
      return prev + curr
    }, 0);

    return total
  }

  function _selectArr(set, weights, options) {
    if (typeof options.rand !== 'function') {
      options.rand = Math.random;
    }

    if (set.length !== weights.length) {
      throw new TypeError('Different number of options & weights.')
    }

    var total = options.total || (options.normal ? 1 : getTotal(weights))
      , key = options.rand() * total
      , index = 0;

    for (;index < weights.length; index++) {
      key -= weights[index];

      if (key < 0) {
        return set[index]
      }
    }

    throw new RangeError('All weights do not add up to >= 1 as expected.')
  }

  function _selectObj(obj, options) {
    var keys = Object.keys(obj)
      , values = keys.map(function (key) {
          return obj[key]
        });

    return _selectArr(keys, values, options)
  }

  function select(set, weights, options) {
    if (typeof options === 'function') {
      options = {
        rand: options
      };
    }

    if (options == null) {
      options = {};
    }

    if (Array.isArray(set)) {
      if (weights == null) {
        weights = set.map(function () {
          return 1
        });
      }

      if (Array.isArray(weights)) {
        if (set.length === weights.length) {
          return _selectArr(set, weights, options)
        }

        throw new TypeError('Set and Weights are different sizes.')
      }

      throw new TypeError('Set is an Array, and Weights is not.')
    }

    if (typeof set === 'object') {
      return _selectObj(set, weights || options)
    }

    throw new TypeError('Set is not an Object, nor is it an Array.')
  }

  var weighted = select;
  var select_1 = select;
  weighted.select = select_1;

  var weighted$1 = weighted;

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
        const chooseRandomWrestler = wrestlers => weighted$1.select(wrestlers, getWrestlerWeights(wrestlers.length));
    
        const result = [];
        const { tag, amount, male, } = options;
        let noWrestlers = weighted$1.select(amount.options, amount.weights);
    
        const gender = weighted$1.select(male.options, male.weights) ? "male": "female";
        const isTagMatch = weighted$1.select(tag.options, tag.weights);
    
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

  Object.defineProperty(exports, '__esModule', { value: true });

})));
