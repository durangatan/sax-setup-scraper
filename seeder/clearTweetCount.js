import * as admin from 'firebase-admin';
import { updateDocument } from './utils';
const serviceAccount = require('../saxsetups-firebase-adminsdk-esuq4-02facd7338.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://saxsetups.firebaseio.com'
});

const db = admin.firestore();

async function addTweetCount() {
  const allPlayersSnapshot = await db.collection('players').get();
  allPlayersSnapshot.docs.forEach(async doc => {
    const data = doc.data();
    updateDocument(db, 'players', doc.id, { hasImage: Boolean(data.images && data.images.length) });
  });
}
addTweetCount();
