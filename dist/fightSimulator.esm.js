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

const formatModel = {
  prehook: data => data.map(item => Object.assign({}, {
    points: 100
  }, item)),
};
const genderFilter = gender => ({
  posthook: data => data.filter(item => item.gender === gender)
});

var modifiers = {
  genderFilter,
  formatModel
};

export default factory;
export { factory, modifiers };
