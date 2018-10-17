import striptags from "striptags";
export default function scrapeFunction(jsDom) {
  const [names] = jsDom.getElementsByTagName("div");
  const cleanNames = striptags(names.innerHTML)
    .trim()
    .split(/\n/)
    .filter(val => val.length);
  const playerIndicies = [];
  cleanNames.forEach((rowValue, index) => {
    if (rowValue === "Instrument Mouthpiece Reed") {
      playerIndicies.push(index - 1);
    }
  });
  const players = [];
  let currentPlayer = {};
  cleanNames.forEach((rowValue, index) => {
    if (playerIndicies.includes(index)) {
      if (currentPlayer.name) {
        players.push(currentPlayer);
      }
      currentPlayer = { name: rowValue, setups: [] };
      return;
    }
    if (rowValue !== "Instrument Mouthpiece Reed" && rowValue.length > 2) {
      currentPlayer.setups.push({ misc: rowValue });
    }
  });
  return {
    players
  };
}
