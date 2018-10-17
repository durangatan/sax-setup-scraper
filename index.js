// import runner from "./runner";
// import config from './sites/saxxas';

// runner(config);
// import { getGoogleSheet } from "./fetcher";

// const setupsSheet = {
//   spreadsheetId: "16VTbJuRH2NAiJ3FQzbTue1KulfYdNW8MENp9qrzMHRE",
//   range: "setups!A2:AB240",
//   callback: console.log
// };

// getGoogleSheet(setupsSheet);
import writeToJson from "./writer";
import data from "./setups.json";

const players = data.players
  .map(player => {
    const [firstName, lastName] = player.name.split(" ");
    delete player.name;
    return Object.assign(player, { firstName, lastName });
  })
  .sort(function(a, b) {
    var nameA = a.lastName.toUpperCase(); // ignore upper and lowercase
    var nameB = b.lastName.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }

    // names must be equal
    return 0;
  });
writeToJson({ players }, "./new-setups.json");
