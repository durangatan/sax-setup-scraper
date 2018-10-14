import striptags from 'striptags';

// given a DOM node, get the actual data we want.
export function getCleanData(data) {
  return striptags(data.innerHTML.replace(/(\n|&nbsp;|&gt;|\t| *(?= ))/g, '')).trim();
}

export function addToPlayerIfExists(name, setup, playerSetups) {
  const existingPlayer = playerSetups.find(playerSetup => playerSetup.name === name);
  if (existingPlayer) {
    existingPlayer.setups.push(setup);
  } else {
    playerSetups.push({ name, setups: [setup] });
  }
}
