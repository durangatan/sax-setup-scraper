import * as admin from 'firebase-admin';
import { updateDocument } from './utils';
const serviceAccount = require('../saxsetups-firebase-adminsdk-esuq4-02facd7338.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://saxsetups.firebaseio.com'
});

const db = admin.firestore();
