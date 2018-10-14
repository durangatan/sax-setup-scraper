import { getCleanData } from '../../scraper/utils';

const noDoubleSpaces = text => text.replace(/  /g, ' ');

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
        setups.push({
          mouthpiece: mouthpiece && noDoubleSpaces(mouthpiece),
          reed: reed && noDoubleSpaces(reed),
          voice: voiceIndexes[index] && noDoubleSpaces(voiceIndexes[index])
        });
      }
    });

    return {
      name: noDoubleSpaces(getCleanData(name)),
      setups
    };
  });
  return {
    players: playerSetups,
    allPropertyNames: ['mouthpiece', 'reed', 'voice']
  };
}
