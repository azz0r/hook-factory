import {
    groupBy,
    chooseRandom
} from "../helpers"

const randomiseResults = () => ({
    posthook: collection => {
        const numberOfTeams = Object.keys(groupBy(collection, "teamId")).length;
        const numberOfWrestlers = collection.length;
        if (numberOfWrestlers > 1 && numberOfTeams > 1) {
            const winner = chooseRandom(collection);
            const losers = collection.filter(loser => loser.teamId !== winner.teamId);
            const loser = chooseRandom(losers);
            return collection.map(item => {
                item.winner = item.id === winner.id || winner.teamId === item.teamId;
                item.loser = item.id === loser.id;
                return item;
            });
        }
        return collection;
    }
})

export default randomiseResults