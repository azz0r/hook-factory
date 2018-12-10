import weighted from "weighted"

export const defaultOptions = {
    male: {
      options: [true, false],
      weights: [0.5, 0.5]
    },
    amount: {
      options: [2, 3, 4, 5, 6],
      weights: [0.5, 0.1, 0.1, 0.1, 0.1]
    },
    tag: {
      options: [true, false],
      weights: [0.3, 0.7],
      perTeam: 2
    },
  }
  
  export const randomiseFight = (options = defaultOptions) => ({
    prehook: data => {
      const result = []
      const getWeights = length => new Array(length).fill(1 / length)
      const chooseRandom = items => weighted.select(items, getWeights(items.length))
      
      const { tag, amount, male, } = options
      const gender = weighted.select(male.options, male.weights)
      const isTagMatch = weighted.select(tag.options, tag.weights)
    
      let maxPerTeam = weighted.select(amount.options, amount.weights)
      let collection = data.filter(item => item.male === gender)
      let teamId = 0
      let perTeam = 0

      if (isTagMatch) {
        maxPerTeam = maxPerTeam * maxPerTeam
      } 

      if (collection.length < 2) {
        collection = data.filter(item => item.male !== gender)
      }
  
      while (maxPerTeam > 0 && collection.length > 0) {
        const chosen = chooseRandom(collection)
        if (isTagMatch) {
          if (perTeam === tag.perTeam) {
            perTeam = 0
            teamId++
          }
          chosen.teamId = teamId
        } else {
          chosen.teamId = teamId++
        }
  
        collection = collection.filter(item => item.id !== chosen.id)
        result.push(chosen)
  
        perTeam++
        maxPerTeam--
      }
      return result
    }
  })

  export default randomiseFight