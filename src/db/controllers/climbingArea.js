require('dotenv').config()
const { idToString } = require('../../helpers');
const { MongoClient, ObjectId } = require('mongodb');

const url = process.env.MONGO_LOCAL_DB;
const dbName = process.env.DB_NAME;

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
     routes: [], //initialize array in order to push route's ID ref on create
     sport_posts: [] //initialize array in order to push route's ID ref on create
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

    const routes = db.collection('routes');
    let result;

    //option without population
    // const climbing_area = await climbing_areas.findOne({
    //   _id: new ObjectId(data._id)
    // })
    // if (climbing_area) {
    //   climbing_area._id = climbing_area._id.toString();
    //   return climbing_area
    // } else {
    //   return;
    // }

    try {
      //populate route references
      const climbing_area = await climbing_areas.aggregate([
        { $match: { _id: new ObjectId(data._id) } },
        {
          $lookup: {
            from: "routes",
            localField: "routes",
            foreignField: "_id",
            as: "routes"
          }
        }
      ]).toArray();
      return climbing_area[0];
    } catch (e) {
      console.log(e);
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

const getAllClimbingAreas = async () => {
 let client;
 try {
   client = await MongoClient.connect(url, { useNewUrlParser: true });
   const db = client.db(dbName);
   const climbing_areas = db.collection('climbing_areas');

   const climbing_areasArray = await climbing_areas.find().limit(10).toArray();
   const climbing_areaWithStrID = climbing_areasArray.map(idToString);
   return climbing_areaWithStrID;
 } catch (err) {
   //eslint-disable-next-line
   console.log(err.stack);
 }
 client.close();
}

module.exports = {
  createClimbingArea,
  getClimbingArea,
  deleteClimbingArea,
  getAllClimbingAreas,
}
