 require('dotenv').config()
const { idToString } = require('../helpers');
const { MongoClient, ObjectId } = require('mongodb');

const url = process.env.MONGO_LOCAL_DB;
const dbName = process.env.DB_NAME;


const createUser = async ({ data }) => {
  let client;
  try {

    client = await MongoClient.connect(url, { useNewUrlParser: true });
    const db = client.db(dbName);
    const users = db.collection('users');

    const { username, email } = data;

    const user = await users.insertOne({
      username,
      email,
      leisure_posts: [],
      sport_posts: []
    })

    if (user.insertedId) {

        //FIX -  add spread operator
        const res = Object.assign({_id: user.insertedId.toString()}, data)
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

const createRoute = async ({ data }) => {
  let client;
  try {

    client = await MongoClient.connect(url, { useNewUrlParser: true });
    const db = client.db(dbName);
    const routes = db.collection('routes');
    const climbing_areas = db.collection('climbing_areas');

    const { name, difficulty, length_m, tags, style, climbing_area_name } = data;

    const route = await routes.insertOne({
      name,
      climbing_area_name,
      difficulty,
      length_m,
      tags,
      style
    })

    if (route.insertedId) {
      const targetClimbingArea =  await climbing_areas.updateOne(
        { "name": climbing_area_name },
        { $push: { routes: route.insertedId} }
      )
      if (targetClimbingArea.modifiedCount > 0) {
        //FIX -  add spread operator
        const res = Object.assign({_id: route.insertedId.toString()}, data)
        return res;
      } else {
        console.log('route wasnt appended to climbing area');
      }
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


const createClimbingArea = async ({ data }) => {
  let client;
  try {
    client = await MongoClient.connect(url, { useNewUrlParser: true });
    const db = client.db(dbName);
    const climbing_areas = db.collection('climbing_areas');

    const { name, country } = data;

    const climbing_area = await climbing_areas.insertOne({
      name,
      country,
      routes: [] //initialize array in order to push route's ID ref on create
    })
    if (climbing_area.insertedId) {
      //FIX -  add spread operator
      const res = Object.assign({_id: climbing_area.insertedId.toString()}, data)
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

const getClimbingArea = async (data) => {
  let client;
  try {
    client = await MongoClient.connect(url, { useNewUrlParser: true });
    const db = client.db(dbName);
    const climbing_areas = db.collection('climbing_areas');

    const climbing_area = await climbing_areas.findOne({
      _id: new ObjectId(data._id)
    })
    console.log(climbing_area);
    if (climbing_area) {
      climbing_area._id = climbing_area._id.toString();
      return climbing_area
    } else {
      return;
    }
  } catch (err) {
    //eslint-disable-next-line
    console.log(err.stack);
  }
  client.close();
}

const deleteClimbingArea = async (_id) => {
  let client;
  try {
    client = await MongoClient.connect(url, { useNewUrlParser: true });
    const db = client.db(dbName);
    const climbing_areas = db.collection('climbing_areas');
    const routes = db.collection('routes');


    const deletedClimbingArea = await climbing_areas.deleteOne({
      _id: new ObjectId(_id)
    })

    //FIX: delete all the included routes ???
    if (deletedClimbingArea.deletedCount > 0) {
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


const createLeisurePost = async ({ data }) => {
  let client;
  try {

    client = await MongoClient.connect(url, { useNewUrlParser: true });
    const db = client.db(dbName);
    const leisure_posts = db.collection('leisure_posts');
    const users = db.collection('users');

    const { user_id, img_url } = data;

    const leisure_post = await leisure_posts.insertOne({
      user_id: new ObjectId(user_id),
      img_url
    })

    if (leisure_post.insertedId) {
      const targetUser =  await users.updateOne(
        { _id: new ObjectId(user_id) },
        { $push: { leisure_posts: leisure_post.insertedId} }
      )
      if (targetUser.modifiedCount > 0) {
        //FIX -  add spread operator
        const res = Object.assign({_id: leisure_post.insertedId.toString()}, data)
        return res;
      } else {
        console.log('leisurePost wasnt appended to user creator');
      }
    } else {
      return;
    }
  } catch (err) {
    //eslint-disable-next-line
    console.log(err.stack);
  }
  client.close();
}

const createSportPost = async ({ data }) => {
  let client;
  try {

    client = await MongoClient.connect(url, { useNewUrlParser: true });
    const db = client.db(dbName);
    const sport_posts = db.collection('sport_posts');
    const users = db.collection('users');

    const { user_id, img_url, route_id } = data;

    const sport_post = await sport_posts.insertOne({
      user_id: new ObjectId(user_id),
      img_url,
      route_id:  new ObjectId(route_id)
    })

    if (sport_post.insertedId) {
      const targetUser =  await users.updateOne(
        { _id: new ObjectId(user_id) },
        { $push: { sport_posts: sport_post.insertedId} }
      )
      if (targetUser.modifiedCount > 0) {
        //FIX -  add spread operator
        const res = Object.assign({_id: sport_post.insertedId.toString()}, data)
        return res;
      } else {
        console.log('sportPost wasnt appended to user creator');
      }
    } else {
      return;
    }
  } catch (err) {
    //eslint-disable-next-line
    console.log(err.stack);
  }
  client.close();
}

module.exports = {
  createUser,
  getRoute,
  createRoute,
  deleteRoute,
  createClimbingArea,
  getClimbingArea,
  createLeisurePost,
  createSportPost,
}
