import { getCleanData } from '../../scraper/utils';

const addToPlayerIfExists = (name, setup, playerSetups) => {
  const existingPlayer = playerSetups.find(playerSetup => playerSetup.name === name);
  if (existingPlayer) {
    existingPlayer.setups.push(setup);
  } else {
    playerSetups.push({ name, setups: [setup] });
  }
};

export default function scrapeFunction(jsDoc) {
  const playerLis = jsDoc.getElementsByTagName('li');
  const playerSetups = [];
  Array.from(playerLis).forEach(player => {
    const cleanPlayer = getCleanData(player);
    const separator = cleanPlayer.includes('-') ? '-' : ':';
    const [name, gear] = cleanPlayer.split(separator);
    if (separator === '-') {
      const [saxophone, mouthpiece, reeds] = gear
        .split(/,[^x]/)
        .filter(gearEntry => gearEntry !== '?')
        .map(gearEntry => gearEntry.trim());
      addToPlayerIfExists(name.trim(), { saxophone, mouthpiece, reeds }, playerSetups);
    } else {
      const reeds = gear.trim();
      addToPlayerIfExists(name.trim(), { reeds }, playerSetups);
    }
  });
  return {
    allPropertyNames: ['saxophone', 'mouthpiece', 'reeds'],
    players: playerSetups
  };
}
