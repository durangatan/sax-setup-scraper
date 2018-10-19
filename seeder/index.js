import * as admin from 'firebase-admin';
import { asyncForEach, addToCollection } from './utils';
const serviceAccount = require('./saxsetups-firebase-adminsdk-esuq4-02facd7338.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://saxsetups.firebaseio.com'
});

const db = admin.firestore();
const data = require('./data.json');

async function seed({ firstName, lastName, setups }) {
  // for each player, create an instance that has an id
  const newPlayer = await addToCollection(db, 'players', {
    firstName,
    lastName
  });

  // for each setup, create instance with the player's id and voice
  await asyncForEach(setups, async setup => {
    const newSetup = await addToCollection(db, 'setups', {
      playerId: newPlayer.id,
      voice: setup.voice || 'Unknown'
    });
    // for each mouthpiece, populate the value with setup id and fields
    const mouthpieces = setup.mouthpieces || [];
    await asyncForEach(
      mouthpieces,
      async mpc => await addToCollection(db, 'mouthpieces', Object.assign({}, mpc, { setupId: newSetup.id }))
    );
    // for each reed, populate the value with setupID and fields,
    const reeds = setup.reeds || [];
    await asyncForEach(
      reeds,
      async reed => await addToCollection(db, 'reeds', Object.assign({}, reed, { setupId: newSetup.id }))
    );
    // for each saxophone, populate the value with setupID and fields
    const saxophones = setup.saxophones || [];
    await asyncForEach(
      saxophones,
      async saxophone => await addToCollection(db, 'saxophones', Object.assign({}, saxophone, { setupId: newSetup.id }))
    );
  });
}

async function seedAll() {
  return asyncForEach(data.players, seed);
}

seedAll();
