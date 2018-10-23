require('dotenv').config()
const { idToString } = require('../../helpers');
const { MongoClient, ObjectId } = require('mongodb');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const url = process.env.MONGO_LOCAL_DB;
const dbName = process.env.DB_NAME;


const createUser = async ({ data }) => {
  let client;
  try {

    client = await MongoClient.connect(url, { useNewUrlParser: true });
    const db = client.db(dbName);
    const users = db.collection('users');

    const { username, email, password } = data;
    const existedUser = await users.findOne({ username });

    if (existedUser) {
      return;
    } else {
      const saltRounds = 10;
      let hashedPassword = await bcrypt.hash(password, saltRounds);
      const user = await users.insertOne({
        username,
        email,
        leisure_posts: [],
        sport_posts: [],
        password: hashedPassword
      })

      if (user.insertedId) {

        //FIX -  add spread operator
        const res = Object.assign({_id: user.insertedId.toString()}, data)
        return res;

      } else {
        return;
      }
    }
  } catch (err) {
    //eslint-disable-next-line
    console.log(err.stack);
  }
  client.close();
}

const loginUser = async (username, password) => {
  let client;
  try {

    client = await MongoClient.connect(url, { useNewUrlParser: true });
    const db = client.db(dbName);
    const users = db.collection('users');

    const user = await users.findOne({ username });
    if (user) {
      const pendingToMatch = await bcrypt.compare(password, user.password)

      if (pendingToMatch) {
        let userToken = jwt.sign(
          {  username: username  },
          process.env.JWT_SECRET,
          { expiresIn: '24h' }
        );

        return { user, token: userToken };
      } else {
        return;
      }
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
    let user;
    if (data._id) {
      user = await users.findOne({
        _id: new ObjectId(data._id)
      })
    } else if (data.username) {
      user = await users.findOne({
        username: data.username
      })
    }
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
  createUser,
  loginUser
}
