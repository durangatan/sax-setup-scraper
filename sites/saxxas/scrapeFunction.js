import { getCleanData } from '../../scraper/utils';

export default function scrapeFunction(jsDom) {
  const [siteTitle, headerRow, ...playerRows] = jsDom.getElementsByTagName('tr');
  const [nameLabel, ...voices] = Array.from(headerRow.children).map(getCleanData);
  const playerSetups = playerRows.map(playerRow => {
    const setups = [];
    const [name, ...setupValues] = playerRow.children;

    Array.from(setupValues).forEach((setupCell, index) => {
      const voiceIndexes = [...voices];
      const cleanValue = getCleanData(setupCell);
      if (cleanValue && cleanValue.length) {
        const [mouthpiece, reed] = cleanValue.split(',');
        setups.push({ mouthpiece, reed, voice: voiceIndexes[index] });
      }
    });

    return {
      name: getCleanData(name),
      setups
    };
  });
  return {
    players: playerSetups,
    allPropertyNames: ['mouthpiece', 'reed', 'voice']
  };
}
