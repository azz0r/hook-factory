'use strict';

const factory = function({ data = {}, modifiers = [] }) {
  let props = JSON.parse(JSON.stringify(data));
  const prehooks = modifiers.map(modifier => modifier.prehook);
  const posthooks = modifiers.map(modifier => modifier.posthook);

  prehooks.forEach(prehook => (props = prehook(props)));
  posthooks.forEach(posthook => (props = posthook(props)));
  return props;
};

module.exports = factory;
