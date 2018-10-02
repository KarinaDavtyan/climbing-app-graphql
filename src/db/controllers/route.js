require('dotenv').config()
const { idToString } = require('../../helpers');
const { MongoClient, ObjectId } = require('mongodb');

const url = process.env.MONGO_LOCAL_DB;
const dbName = process.env.DB_NAME;

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

const getRoutesByClimbingAreaName = async (data) => {
 let client;
 try {
   client = await MongoClient.connect(url, { useNewUrlParser: true });
   const db = client.db(dbName);
   const routes = db.collection('routes');
   const { climbing_area_name } = data;
   const routesArray = await routes.find({ climbing_area_name }).limit(10).toArray();
   const routesWithStrID = routesArray.map(idToString);
   return routesWithStrID;
 } catch (err) {
   //eslint-disable-next-line
   console.log(err.stack);
 }
 client.close();
}

module.exports = {
  createRoute,
  getRoute,
  getRoutes,
  getRoutesByClimbingAreaName,
}
