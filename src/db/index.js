 require('dotenv').config()
const { idToString } = require('../helpers');
const { MongoClient } = require('mongodb');

const url = process.env.MONGO_LOCAL_DB;
const dbName = process.env.DB_NAME;

const postRoute = async ({ data }) => {
  let client;
  try {
    client = await MongoClient.connect(url, { useNewUrlParser: true });
    const db = client.db(dbName);
    const routes = db.collection('routes');

    const { _id, title, location } = data;

    const route = routes.insert({
      title
    })
    return route;
  } catch (err) {
    //eslint-disable-next-line
    console.log(err.stack);
  }
  client.close();
}

const getRoutes = async () => {
  let client;
  try {
    client = await MongoClient.connect(url, { useNewUrlParser: true });
    const db = client.db(dbName);
    const routes = db.collection('routes');

    const routesArray = await routes.find().limit(10).toArray();
    const routesWithStrID = routesArray.map(idToString);
    return routesWithStrID;
  } catch (err) {
    //eslint-disable-next-line
    console.log(err.stack);
  }
  client.close();
}



module.exports = {
  postRoute,
  getRoutes
}
