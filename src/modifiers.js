export const noop = data => data;
export const formatModel = {
  prehook: data => data.map(item => Object.assign({}, { points: 100 }, item)),
  posthook: data => noop(data)
};
export const genderFilter = gender => ({
  prehook: data => noop(data),
  posthook: data => data.filter(item => item.gender === gender)
});

export default { genderFilter, formatModel };
