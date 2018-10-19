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

    const { user_id, img_url, username } = data;

    const leisure_post = await leisure_posts.insertOne({
      user_id: new ObjectId(user_id),
      username,
      img_url,
      likes: 0
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

const getLeisurePost = async (data) => {
 let client;
 try {
   client = await MongoClient.connect(url, { useNewUrlParser: true });
   const db = client.db(dbName);
   const leisure_posts = db.collection('leisure_posts');

   const leisure_post = await leisure_posts.findOne({
     _id: new ObjectId(data._id)
   })
   if (leisure_post) {
     leisure_post._id = leisure_post._id.toString();
     return leisure_post
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
const getAllLeisurePosts = async () => {
 let client;
 try {
   client = await MongoClient.connect(url, { useNewUrlParser: true });
   const db = client.db(dbName);
   const leisure_posts = db.collection('leisure_posts');

   const leisure_postsArray = await leisure_posts.find().limit(10).toArray();
   const leisure_postsWithStrID = leisure_postsArray.map(idToString);
   return leisure_postsWithStrID;
 } catch (err) {
   //eslint-disable-next-line
   console.log(err.stack);
 }
 client.close();
}

module.exports = {
  createLeisurePost,
  getLeisurePost,
  getAllLeisurePosts
};
