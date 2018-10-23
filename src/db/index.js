const {  createUser, getUser, loginUser } = require('./controllers/user.js');
const {  getRoute, createRoute, deleteRoute, getRoutesByClimbingAreaName } = require('./controllers/route.js');
const {  getClimbingArea, createClimbingArea, deleteClimbingArea, getAllClimbingAreas } = require('./controllers/climbingArea.js');
const {  createLeisurePost, getLeisurePost, getAllLeisurePosts } = require('./controllers/leisurePost.js');
const {  createSportPost, getSportPost, getAllSportPosts } = require('./controllers/sportPost.js');

module.exports = {
  getUser,
  createUser,
  loginUser,

  getRoute,
  createRoute,
  deleteRoute,
  getRoutesByClimbingAreaName,

  createClimbingArea,
  getClimbingArea,
  getAllClimbingAreas,

  createLeisurePost,
  getLeisurePost,
  getAllLeisurePosts,

  createSportPost,
  getSportPost,
  getAllSportPosts
}
