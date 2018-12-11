export default ({
    prehook: data => {
        data.count++
        return data;
    },
    posthook: data => {
        data.count++
        return data;
    }
});