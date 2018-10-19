import fetch from 'isomorphic-fetch';
import * as admin from 'firebase-admin';
import { asyncForEach, addToCollection, updateDocument } from './utils';
const serviceAccount = require('./saxsetups-firebase-adminsdk-esuq4-02facd7338.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://saxsetups.firebaseio.com'
});
const db = admin.firestore();

const logger = console.log;
async function fetchThumbnailFromWikimedia(title, thumbsize) {
  const response = await fetch(
    `https://en.wikipedia.org/w/api.php?action=query&titles=${title}&prop=pageimages&format=json&pithumbsize=${String(
      thumbsize
    )}`
  );
  const json = await response.json();
  if (json.query.pages) {
    const articleKey = Object.keys(json.query.pages)[0];
    console.log(json.query.pages);
    const page = json.query.pages[articleKey];
    const thumbnail = json.query.pages[articleKey].thumbnail;
    logger(`fetched image for ${title}, ${thumbnail.source}`);
    return thumbnail;
  }
}

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.substr(1);
}

async function getImages() {
  const allPlayersSnapshot = await db.collection('players').get();
  allPlayersSnapshot.docs.forEach(async doc => {
    const { firstName, lastName } = doc.data();
    if (firstName || lastName) {
      const title = `${capitalize(firstName)}_${capitalize(lastName)}`;
      const image = {};
      const smallThumb = await fetchThumbnailFromWikimedia(title, 80);
      if (smallThumb) image.thumb = smallThumb;
      const largeThumb = await fetchThumbnailFromWikimedia(title, 600);
      if (largeThumb) image.full = largeThumb;
      if (smallThumb || largeThumb) {
        await updateDocument(db, 'players', doc.id, { images: [image] });
      }
    }
  });
}

getImages();
