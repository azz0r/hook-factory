import weighted from 'weighted';

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

const select = weighted.select;
const arrayOfLength = length => new Array(length).fill(1 / length);
const chooseRandom = items => select(items, arrayOfLength(items.length));

const select$1 = weighted.select;

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
  prehook: data => {
    const {
      tag,
      amount,
      male,
    } = options;
    const gender = select$1(male.options, male.weights);
    const isTagMatch = select$1(tag.options, tag.weights);

    let maxPerTeam = select$1(amount.options, amount.weights);
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

const filterByGender = gender => ({
    posthook: data => data.filter(item => item.male === Boolean(gender))
});

var formatModel = {
    prehook: data => data.map(item => Object.assign({}, {
        points: 100
    }, item)),
};



var index = /*#__PURE__*/Object.freeze({
  randomiseFight: randomiseFight,
  filterByGender: filterByGender,
  formatModel: formatModel
});

export default factory;
export { factory, index as modifiers };
