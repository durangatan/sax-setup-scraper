const { lstatSync, readdirSync } = require('fs');
const { join } = require('path');
import writeToJson from './writer';
import { addToPlayerIfExists } from './scraper/utils';
const isDirectory = source => lstatSync(source).isDirectory();
const getDirectories = source =>
  readdirSync(source)
    .map(name => join(source, name))
    .filter(isDirectory);

const players = [];
getDirectories('./sites').map(site => {
  const jayson = require(`./${site}/setups.json`);
  jayson.players.map(player => {
    player.setups.map(setup => {
      addToPlayerIfExists(player.name, setup, players);
    });
  });
});
writeToJson({ players });
