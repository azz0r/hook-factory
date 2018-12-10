(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.fightSimulator = {})));
}(this, (function (exports) { 'use strict';

  function factory ({
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
  }

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

  const select$1 = weighted$1.select;
  const arrayOfLength = length => new Array(length).fill(1 / length);
  const chooseRandom = items => select$1(items, arrayOfLength(items.length));
  const groupBy = (objectArray, property) => {
      return objectArray.reduce((acc, obj) => {
          var key = obj[property];
          if (!acc[key]) {
              acc[key] = [];
          }
          acc[key].push(obj);
          return acc;
      }, {});
  };

  const randomiseResults = () => ({
      posthook: collection => {
          const numberOfTeams = Object.keys(groupBy(collection, "teamId")).length;
          const numberOfWrestlers = collection.length;
          if (numberOfWrestlers > 1 && numberOfTeams > 1) {
              const winner = chooseRandom(collection);
              const losers = collection.filter(loser => loser.teamId !== winner.teamId);
              const loser = chooseRandom(losers);
              return collection.map(item => {
                  item.winner = item.id === winner.id || winner.teamId === item.teamId;
                  item.loser = item.id === loser.id;
                  return item;
              });
          }
          return collection;
      }
  });

  const select$2 = weighted$1.select;

  const defaultOptions = {
    male: {
      options: [true, false],
      weights: [0.5, 0.5]
    },
    amount: {
      options: [2, 3, 4, 5, 6],
      weights: [0.5, 0.1, 0.1, 0.1, 0.1]
    },
    tag: {
      options: [true, false],
      weights: [0.3, 0.7],
      perTeam: 2
    },
  };

  const randomiseFight = (options = defaultOptions, result = []) => ({
    posthook: data => {
      const {
        tag,
        amount,
        male,
      } = options;
      const gender = select$2(male.options, male.weights);
      const isTagMatch = select$2(tag.options, tag.weights);

      let maxPerTeam = select$2(amount.options, amount.weights);
      let collection = data.filter(item => item.male === gender);
      let teamId = 0;
      let perTeam = 0;

      if (isTagMatch) {
        maxPerTeam = maxPerTeam * maxPerTeam;
      }

      if (collection.length < 2) {
        collection = data.filter(item => item.male !== gender);
      }

      while (maxPerTeam > 0 && collection.length > 0) {
        const chosen = chooseRandom(collection);
        if (isTagMatch) {
          if (perTeam === tag.perTeam) {
            perTeam = 0;
            teamId++;
          }
          chosen.teamId = teamId;
        } else {
          chosen.teamId = teamId++;
        }

        collection = collection.filter(item => item.id !== chosen.id);
        result.push(chosen);

        perTeam++;
        maxPerTeam--;
      }
      return result
    }
  });

  var filterByGender = gender => ({
      posthook: data => data.filter(item => item.male === Boolean(gender))
  });

  var addTeamIdToModel = ({
      prehook: data => data.map(item => Object.assign({}, {
          teamId: null
      }, item))
  });

  var addPointsToModel = ({
      prehook: data => data.map(item => Object.assign({}, {
          points: 100
      }, item))
  });



  var index = /*#__PURE__*/Object.freeze({
    randomiseResults: randomiseResults,
    randomiseFight: randomiseFight,
    filterByGender: filterByGender,
    addTeamIdToModel: addTeamIdToModel,
    addPointsToModel: addPointsToModel
  });

  exports.factory = factory;
  exports.modifiers = index;
  exports.default = factory;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
