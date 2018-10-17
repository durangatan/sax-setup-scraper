import flattenDeep from "lodash.flattendeep";
import uniq from "lodash.uniq";
const writeToJson = require("../writer").default;
const data = require("./data.json");
const allWords = [];

const newPlayers = data.players.map(player => {
  const newSetups = player.setups.map(setup => {
    allWords.push(Object.keys(setup).map(key => setup[key].split(" ")));
    return {
      voice: setup.voice,
      mouthpieces: setup.mouthpiece && setup.mouthpiece.split(" or ").map(mpc => mpc.trim()),
      reeds: setup.reed && setup.reed.split(" or ").map(reed => reed.trim()),
      saxophones: setup.saxophone && setup.saxophone.split(" or ").map(sax => sax.trim())
    };
  });
  return { setups: newSetups, firstName: player.firstName, lastName: player.lastName };
});

writeToJson({ players: newPlayers, allWords: uniq(flattenDeep(allWords)) }, "./arrayified.json");
