require('dotenv').config()
const { idToString } = require('../../helpers');
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

const getUser = async (data) => {
  let client;
  try {
    client = await MongoClient.connect(url, { useNewUrlParser: true });
    const db = client.db(dbName);
    const users = db.collection('users');

    const user = await users.findOne({
      _id: new ObjectId(data._id)
    })
    console.log(user);
    if (user) {
      user._id = user._id.toString();
      return user
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
  getUser,
  createUser
}
