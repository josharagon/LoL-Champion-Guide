export const fetchAllChampions = () => {
  return fetch('http://ddragon.leagueoflegends.com/cdn/11.8.1/data/en_US/champion.json')
  .then(response => response.json())
  .then(allChampions => {
    const championArray = Object.keys(allChampions.data).map((key) => allChampions.data[key])
    return championArray
  })
}