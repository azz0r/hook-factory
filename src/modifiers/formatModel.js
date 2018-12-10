export default {
    prehook: data => data.map(item => Object.assign({}, {
        points: 100
    }, item)),
};