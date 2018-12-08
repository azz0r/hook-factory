(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.fightSimulator = factory());
}(this, (function () { 'use strict';

  const factory = function({ data = {}, modifiers = [] }) {
    let props = JSON.parse(JSON.stringify(data));
    const prehooks = modifiers.map(modifier => modifier.prehook);
    const posthooks = modifiers.map(modifier => modifier.posthook);

    prehooks.forEach(prehook => (props = prehook(props)));
    posthooks.forEach(posthook => (props = posthook(props)));
    return props;
  };

  return factory;

})));
