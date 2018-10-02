require('dotenv').config()
const { idToString } = require('../../helpers');
const { MongoClient, ObjectId } = require('mongodb');

const url = process.env.MONGO_LOCAL_DB;
const dbName = process.env.DB_NAME;

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


module.exports = {
  createSportPost,
  getSportPost
};
