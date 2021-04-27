export const fetchAllChampions = () => {
  return fetch('http://ddragon.leagueoflegends.com/cdn/11.8.1/data/en_US/champion.json')
  .then(response => response.json())
  .then(allChampions => {
    const championArray = Object.keys(allChampions.data).map((key) => allChampions.data[key])
    console.log(championArray)
    return championArray
  })
}

export const fetchSingleChampion = (id) => {
  return fetch(`http://ddragon.leagueoflegends.com/cdn/11.8.1/data/en_US/champion/${id}.json`)
  .then(response => response.json())
  .then(singleChampion => {
    return singleChampion.data[id]
  })
}