 require('dotenv').config()
const { idToString } = require('../helpers');
const { MongoClient, ObjectId } = require('mongodb');

const url = process.env.MONGO_LOCAL_DB;
const dbName = process.env.DB_NAME;

const createRoute = async ({ data }) => {
  let client;
  try {
    client = await MongoClient.connect(url, { useNewUrlParser: true });
    const db = client.db(dbName);
    const routes = db.collection('routes');

    const { name, difficulty, length_m, tags, style } = data;

    const route = await routes.insertOne({
      name,
      difficulty,
      length_m,
      tags,
      style
    })
    if (route.insertedId) {
      //FIX -  add spread operator
      const res = Object.assign({_id: route.insertedId.toString()}, data)
      return res;
    } else {
      return;
    }
  } catch (err) {
    //eslint-disable-next-line
    console.log(err.stack);
  }
  client.close();
}

const getRoute = async (data) => {
  let client;
  try {
    client = await MongoClient.connect(url, { useNewUrlParser: true });
    const db = client.db(dbName);
    const routes = db.collection('routes');

    const route = await routes.findOne({
      _id: new ObjectId(data._id)
    })
    console.log(route);
    if (route) {
      route._id = route._id.toString();
      return route
    } else {
      return;
    }
  } catch (err) {
    //eslint-disable-next-line
    console.log(err.stack);
  }
  client.close();
}

const deleteRoute = async (_id) => {
  let client;
  try {
    client = await MongoClient.connect(url, { useNewUrlParser: true });
    const db = client.db(dbName);
    const routes = db.collection('routes');

    const deletedRoute = await routes.deleteOne({
      _id: new ObjectId(_id)
    })
    if (deletedRoute.deletedCount > 0) {
      return _id
    } else {
      return;
    }
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
  getRoute,
  createRoute,
  deleteRoute,
}
