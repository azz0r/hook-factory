export const noop = data => data;
export const formatModel = {
  prehook: data => data.map(item => Object.assign({}, {
    points: 100
  }, item)),
};
export const genderFilter = gender => ({
  posthook: data => data.filter(item => item.gender === gender)
});

export default {
  genderFilter,
  formatModel
};