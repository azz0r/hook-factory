export const formatModel = {
    prehook: data => data.map(item => Object.assign({}, {
        points: 100
    }, item)),
};

export default formatModel