export async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    return await callback(array[index], index, array);
  }
}

export async function addToCollection(db, collection, data, logger = console.log) {
  const newInstance = await db.collection(collection).add(data);
  logger(`created ${collection} with id:${newInstance.id}`);
  return newInstance;
}

export async function updateDocument(db, collection, documentId, newFields, logger = console.log) {
  const doc = await db.collection(collection).doc(documentId);
  const updatedDocument = await doc.update(newFields);
  logger(`updated ${collection} #${documentId} fields:${Object.keys(newFields).join(',')}`);
  return updatedDocument;
}
