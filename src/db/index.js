const {  createUser, getUser } = require('./controllers/user.js');
const {  getRoute, createRoute, deleteRoute, getRoutesByClimbingAreaName } = require('./controllers/route.js');
const {  getClimbingArea, createClimbingArea, deleteClimbingArea, } = require('./controllers/climbingArea.js');
const {  createLeisurePost, getLeisurePost } = require('./controllers/leisurePost.js');
const {  createSportPost, getSportPost } = require('./controllers/sportPost.js');

module.exports = {
  getUser,
  createUser,
  getRoute,
  createRoute,
  deleteRoute,
  getRoutesByClimbingAreaName,
  createClimbingArea,
  getClimbingArea,
  createLeisurePost,
  getLeisurePost,
  createSportPost,
  getSportPost
}
