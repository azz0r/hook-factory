export const filterByGender = gender => ({
    posthook: data => data.filter(item => item.male === Boolean(gender))
});

export default filterByGender