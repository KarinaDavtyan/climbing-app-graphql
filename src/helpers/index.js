export const idToString = (doc) => {
  doc._id = doc._id.toString()
  if (doc.user_id) {
    doc.user_id = doc.user_id.toString()
  }
  return doc;
}
