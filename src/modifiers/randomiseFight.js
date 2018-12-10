import weighted from "weighted"

const defaultOptions = {
    male: {
      options: [true, false,],
      weights: [0.8, 0.2,],
    },
    amount: {
      options: [2, 3, 4, 5, 6,],
      weights: [0.5, 0.1, 0.1, 0.1, 0.1,],
    },
    tag: {
      options: [true, false,],
      weights: [0.5, 0.5,],
      perTeam: 2,
    },
  }
  
  export const randomiseFight = (options = defaultOptions) => ({
    prehook: data => {
      const getWrestlerWeights = length => new Array(length).fill(1 / length)
      const chooseRandomWrestler = wrestlers => weighted.select(wrestlers, getWrestlerWeights(wrestlers.length))
  
      const result = []
      const { tag, amount, male, } = options
      let noWrestlers = weighted.select(amount.options, amount.weights)
  
      const gender = weighted.select(male.options, male.weights) ? "male": "female"
      const isTagMatch = weighted.select(tag.options, tag.weights)
  
      let wrestlers = data.filter(wrestler => wrestler.gender === gender)
  
      if (isTagMatch) {
        noWrestlers = noWrestlers * noWrestlers
      }
  
      let teamId = 0,
        perTeam = 0
      while (noWrestlers > 0 && wrestlers.length > 0) {
        wrestlers = wrestlers.filter(wrestler => !ids.includes(wrestler.id))
        const chosenWrestler = chooseRandomWrestler(wrestlers)
        if (isTagMatch) {
          if (perTeam === tag.perTeam) {
            perTeam = 0
            teamId++
          }
          chosenWrestler.teamId = teamId
        } else {
          chosenWrestler.teamId = teamId++
        }
  
        wrestlers = wrestlers.filter(wrestler => wrestler.id !== chosenWrestler.id)
        result.push(chosenWrestler)
  
        perTeam++
        noWrestlers--
      }
      return result
    }
  })

  export default randomiseFight