// eventually this should run whenever a new setup is added.
import logger from '../logger';
import * as admin from 'firebase-admin';
import { asyncForEach } from './utils';
const serviceAccount = require('../saxsetups-firebase-adminsdk-esuq4-02facd7338.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://saxsetups.firebaseio.com'
});

const db = admin.firestore();
async function getUpdatedPlayers() {
  const allPlayersSnapshot = await db.collection('players').get();
  const setups = await admin
    .firestore()
    .collection('setup')
    .get();
  const mouthpieces = await admin
    .firestore()
    .collection('mouthpieces')
    .get();
  const reeds = await admin
    .firestore()
    .collection('reeds')
    .get();
  const saxophones = await admin
    .firestore()
    .collection('saxophones')
    .get();
  const updatedPlayers = [];
  allPlayersSnapshot.docs.forEach(doc => {
    const playerData = doc.data();
    const updatedPlayer = Object.assign(
      playerData,
      {
        setups: setups.docs
          .filter(setup => setup.data().playerId === doc.id)
          .map(setup => {
            return Object.assign(
              setup.data(),
              {
                mouthpieces: mouthpieces.docs
                  .map(mouthpiece => Object.assign(mouthpiece.data(), { id: mouthpiece.id }))
                  .filter(mouthpiece => mouthpiece.setupId === setup.id)
                  .filter(obj => obj),
                reeds: reeds.docs
                  .map(reed => Object.assign(reed.data(), { id: reed.id }))
                  .filter(reed => reed.setupId === setup.id)
                  .filter(obj => obj),
                saxophones: saxophones.docs
                  .map(saxophone => Object.assign(saxophone.data(), { id: saxophone.id }))
                  .filter(saxophone => saxophone.setupId === setup.id)
                  .filter(obj => obj)
              },
              { id: setup.id }
            );
          })
          .filter(obj => obj)
      },
      { id: doc.id }
    );
    updatedPlayers.push(updatedPlayer);
  });
  return updatedPlayers;
}

async function mapSetupsToPlayers() {
  const updatedPlayers = await getUpdatedPlayers();

  updatedPlayers.forEach(async player => {
    await db
      .collection('players')
      .doc(player.id)
      .set(player);
  });
}

mapSetupsToPlayers();
