export const idToString = (doc) => {
  doc._id = doc._id.toString()
  return doc;
}
