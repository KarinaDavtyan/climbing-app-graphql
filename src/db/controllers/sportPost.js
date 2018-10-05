require('dotenv').config()
const { idToString } = require('../../helpers');
const { MongoClient, ObjectId } = require('mongodb');
const moment = require('moment');

const url = process.env.MONGO_LOCAL_DB;
const dbName = process.env.DB_NAME;

//FIX: when user upload sport_post he/she also attempts it, so
// ++ attempts in route db.routes
// ID attemptedRoutes for user db.users
const createSportPost = async ({ data }) => {
  let client;
  try {

    client = await MongoClient.connect(url, { useNewUrlParser: true });
    const db = client.db(dbName);
    const sport_posts = db.collection('sport_posts');
    const users = db.collection('users');
    const routes = db.collection('routes');
    const climbing_areas = db.collection('climbing_areas');
    const mockImg = 'https://cdn.shopify.com/s/files/1/0431/5453/files/10979516_1585640008315194_416908833_n_large.jpg?1179517113109345823';

    const {
      user_id,
      username,
      img_url,
      climbing_area_name,
      route_name,
    } = data;

    const sport_post = await sport_posts.insertOne({
      user_id: new ObjectId(user_id),
      username,
      img_url: mockImg,
      climbing_area_name,
      route_name,
      date_posted: moment().toISOString(),
      attempts: 1
    })

    //if sport+post was inserted successfully
    if (sport_post.insertedId) {

      //update user document
      const targetUser =  await users.updateOne(
        { _id: new ObjectId(user_id) },
        { $push: { sport_posts: sport_post.insertedId} }
      )

      //and create route from the post, so routes' db is updating
      const route = await routes.insertOne({
        name: route_name,
        climbing_area_name,
        img_url,
      })

      //and if it was created successfully
      if (route.insertedId) {

        //update climbing_area document
        const targetClimbingArea =  await climbing_areas.updateOne(
          { name: climbing_area_name },
          { $push: { routes: route.insertedId, sport_posts: sport_post.insertedId} }
        )
      }

      //return created sport_post
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

const getSportPost = async (data) => {
 let client;
 try {
   client = await MongoClient.connect(url, { useNewUrlParser: true });
   const db = client.db(dbName);
   const sport_posts = db.collection('sport_posts');

   const sport_post = await sport_posts.findOne({
     _id: new ObjectId(data._id)
   })
   if (sport_post) {
     sport_post._id = sport_post._id.toString();
     return sport_post
   } else {
     return;
   }
 } catch (err) {
   //eslint-disable-next-line
   console.log(err.stack);
 }
 client.close();
}

//get sport_posts for foreignField
//location based???
//time based feed???
//
//Add pagination
const getAllSportPosts = async () => {
 let client;
 try {
   client = await MongoClient.connect(url, { useNewUrlParser: true });
   const db = client.db(dbName);
   const sport_posts = db.collection('sport_posts');

   const sport_postsArray = await sport_posts.find().limit(10).toArray();
   const sport_postsWithStrID = sport_postsArray.map(idToString);
   return sport_postsWithStrID;
 } catch (err) {
   //eslint-disable-next-line
   console.log(err.stack);
 }
 client.close();
}

module.exports = {
  createSportPost,
  getSportPost,
  getAllSportPosts,
};
