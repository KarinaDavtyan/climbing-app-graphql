const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost:27017/climbing_app_native';


const getCollections = async (telegramId) => {
  let client;
  try {
    client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const users = db.collection('users');
    const selections = db.collection('selections');


    let { _id } = await users.findOne({ telegramId });
    let selectionArray = await selections.find({ owner: _id }).limit(8).toArray();
    return selectionArray;
  } catch (err) {
    //eslint-disable-next-line
    console.log(err.stack);
  }
  client.close();
}


module.exports = {
  getCollections
}
