require('dotenv').config()
const { idToString } = require('../../helpers');
const { MongoClient, ObjectId } = require('mongodb');

const url = process.env.MONGO_LOCAL_DB;
const dbName = process.env.DB_NAME;

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

module.exports = {
  createLeisurePost,
};
