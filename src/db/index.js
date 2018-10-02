const {  createUser, getUser } = require('./controllers/user.js');
const {  getRoute, createRoute, deleteRoute, } = require('./controllers/route.js');
const {  getClimbingArea, createClimbingArea, deleteClimbingArea, } = require('./controllers/climbingArea.js');
const {  createLeisurePost } = require('./controllers/leisurePost.js');
const {  createSportPost } = require('./controllers/sportPost.js');

module.exports = {
  getUser,
  createUser,
  getRoute,
  createRoute,
  deleteRoute,
  createClimbingArea,
  getClimbingArea,
  createLeisurePost,
  createSportPost,
}
