import weighted from "weighted"
import groupBy from "lodash.groupby"

const select = weighted.select

export default function selectRandomResults(wrestlers = [], highBias = false) {
    const numberOfTeams = Object.keys(groupBy(wrestlers, "teamId")).length
    const numberOfWrestlers = wrestlers.length

    if (numberOfWrestlers > 1 && numberOfTeams > 1) {
        let weightedWrestlers = arrayOfLength(wrestlers.length)

        const lowest = wrestlers.sort((a, b) => a.points > b.points)[0],
            highest = wrestlers.filter(wrestler => wrestler.id !== lowest.id).sort((a, b) => a.points < b.points)[0],
            lowestId = lowest.id,
            highestId = highest.id,
            lowestIndex = wrestlers.findIndex(wrestler => wrestler.id === lowestId),
            highestIndex = wrestlers.findIndex(wrestler => wrestler.id === highestId)

        if (lowest.points !== highest.points) {
            const percentageGain = highBias ? EXTREME_PERCENT_GAIN_FOR_HIGHEST_WRESTLER : PERCENT_GAIN_FOR_HIGHEST_WRESTLER
            const highestAttackersPercentageGain = getPercentageAmount(weightedWrestlers[lowestIndex], percentageGain)

            weightedWrestlers[lowestIndex] = weightedWrestlers[lowestIndex] - highestAttackersPercentageGain
            weightedWrestlers[highestIndex] = weightedWrestlers[highestIndex] + highestAttackersPercentageGain
        }

        const winner = select(wrestlers, weightedWrestlers)
        const losers = wrestlers.filter(loser => loser.teamId !== winner.teamId)
        const losersRandomWeighting = arrayOfLength(losers.length)
        const loser = select(losers, losersRandomWeighting)

        return wrestlers.map(item => {
            item.winner = item.id === winner.id || winner.teamId === item.teamId
            item.loser = item.id === loser.id
            return item
        })
    }
    return wrestlers
}