(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.fightSimulator = {})));
}(this, (function (exports) { 'use strict';

  const factory = function({ data = {}, modifiers = [] }) {
    let props = JSON.parse(JSON.stringify(data));
    const prehooks = modifiers.map(modifier => modifier.prehook);
    const posthooks = modifiers.map(modifier => modifier.posthook);

    prehooks.forEach(prehook => (props = prehook(props)));
    posthooks.forEach(posthook => (props = posthook(props)));
    return props;
  };

  const noop = data => data;
  const formatModel = {
    prehook: data => data.map(item => Object.assign({}, { points: 100 }, item)),
    posthook: data => noop(data)
  };
  const genderFilter = gender => ({
    prehook: data => noop(data),
    posthook: data => data.filter(item => item.gender === gender)
  });

  var modifiers = { genderFilter, formatModel };

  exports.factory = factory;
  exports.modifiers = modifiers;
  exports.default = factory;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
