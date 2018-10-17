import { getCleanData, addToPlayerIfExists } from "../../scraper/utils";

export default function scrapeFunction(jsDoc) {
  const playerLis = jsDoc.getElementsByTagName("li");
  const playerSetups = [];
  Array.from(playerLis).forEach(player => {
    const cleanPlayer = getCleanData(player);
    const separator = cleanPlayer.includes("-") ? "-" : ":";
    const [name, gear] = cleanPlayer.split(separator);
    if (separator === "-") {
      const [saxophone, mouthpiece, reeds] = gear
        .split(/,[^x]/)
        .filter(gearEntry => gearEntry !== "?")
        .map(gearEntry => gearEntry.trim());
      addToPlayerIfExists(name.trim(), { saxophone, mouthpiece, reeds }, playerSetups);
    } else {
      const reeds = gear.trim();
      addToPlayerIfExists(name.trim(), { reeds }, playerSetups);
    }
  });
  return {
    players: playerSetups
  };
}
