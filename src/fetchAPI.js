export const fetchAllChampions = () => {
  return fetch('http://ddragon.leagueoflegends.com/cdn/11.8.1/data/en_US/champion.json')
  .then(response => response.json())
  .then(allChampions => {
    return allChampions
  })
}