export default gender => ({
    posthook: data => data.filter(item => item.male === Boolean(gender))
});