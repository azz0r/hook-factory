export default ({
    prehook: data => data.map(item => Object.assign({}, {
        teamId: null
    }, item))
})