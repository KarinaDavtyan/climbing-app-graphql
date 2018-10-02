import merge from 'lodash.merge';
import db from '../../db';
import ClimbingArea from '../types/climbingArea/resolvers.js';

//FIX: Dont repeat code!!!
const resolvers = {
  Query: {
    route: async (root, args)=> {
      const route = await db.getRoute({_id: args._id});
      return route
    },
    user: async (root, args)=> {
      const user = await db.getUser({_id: args._id});
      return user
    },
    climbing_area: async (root, args)=> {
      const climbing_area = await db.getClimbingArea({_id: args._id});
      return climbing_area
    },
    leisure_post: async (root, args)=> {
      const leisure_post = await db.getLeisurePost({_id: args._id});
      return leisure_post
    },
    sport_post: async (root, args)=> {
      const sport_post = await db.getSportPost({_id: args._id});
      return sport_post
    }
  },
  Mutation: {
    createUser: async (root, args) => {
      try {
        const data = {
          username: args.user.username,
          email: args.user.email,
        }
        const user = await db.createUser({ data });
        if (user) {
          const response = {
            success: true,
            message: `User ${user._id} successfully added`
          }
          const result = Object.assign(
            { user }, response
          )
          return result;
        } else {
          const response = {
            success: false,
            message: `User ${data.username} NOT added`
          }
          return response;
        }
      } catch (e) {
        console.log(e, "ERROR createRoute");
      }
    },
    createRoute: async (root, args) => {
      try {
        const data = {
          name: args.route.name,
          climbing_area_name: args.route.climbing_area_name,
          difficulty: args.route.difficulty,
          length_m: args.route.length_m,
          tags: args.route.tags,
          style: args.route.style
        }
        const route = await db.createRoute({ data });
        if (route) {
          const response = {
            success: true,
            message: `Route ${route._id} successfully added`
          }
          const result = Object.assign(
            { route }, response
          )
          return result;
        } else {
          const response = {
            success: false,
            message: `Route ${data.name} NOT added`
          }
          return response;
        }
      } catch (e) {
        console.log(e, "ERROR createRoute");
      }
    },
    deleteRoute: async (root, args) => {
      const { _id }= args;
      let deletedID;
      try {
        deletedID = await db.deleteRoute(_id);
        if (deletedID) {
          return {
            success: true,
            message: `Route ${deletedID} successfully deleted`,
            deleteRouteID: deletedID
          }
        } else {
          return {
            success: false,
            message: `Route ${deletedID} NOT deleted`,
            deleteRouteID: deletedID
          }
        }
      } catch (e) {
        console.log(e, "ERROR on deleteRoute");
      }
    },
    createClimbingArea: async (root, args) => {
      try {
        const data = {
          name: args.climbing_area.name,
          country: args.climbing_area.country,
        }
        const climbing_area = await db.createClimbingArea({ data });
        if (climbing_area) {
          const response = {
            success: true,
            message: `Climbing area ${climbing_area._id} successfully added`
          }
          const result = Object.assign(
            { climbing_area }, response
          )
          return result;
        } else {
          const response = {
            success: false,
            message: `Climbing area ${data.name} NOT added`
          }
          return response;
        }
      } catch (e) {
        console.log(e, "ERROR createClimbingArea");
      }
    },
    //FIX: - Delete all routes associated
    deleteClimbingArea: async (root, args) => {
      const { _id }= args;
      let deletedID;
      try {
        deletedID = await db.deleteClimbingArea(_id);
        if (deletedID) {
          return {
            success: true,
            message: `ClimbingArea ${deletedID} successfully deleted`,
            deleteClimbingAreaID: deletedID
          }
        } else {
          return {
            success: false,
            message: `ClimbingArea ${deletedID} NOT deleted`,
            deleteClimbingAreaID: deletedID
          }
        }
      } catch (e) {
        console.log(e, "ERROR on deleteClimbingArea");
      }
    },
    createLeisurePost: async (root, args) => {
      try {
        const data = {
          user_id: args.post.user_id,
          img_url: args.post.img_url,
        }
        const post = await db.createLeisurePost({ data });
        if (post) {
          const response = {
            success: true,
            message: `Post ${post._id} successfully added`
          }
          const result = Object.assign(
            { post }, response
          )
          return result;
        } else {
          const response = {
            success: false,
            message: `Post NOT added`
          }
          return response;
        }
      } catch (e) {
        console.log(e, "ERROR createLeisurePost");
      }
    },
    createSportPost: async (root, args) => {
      try {
        const data = {
          user_id: args.post.user_id,
          img_url: args.post.img_url,
          route_id: args.post.route_id
        }
        const post = await db.createSportPost({ data });
        if (post) {
          const response = {
            success: true,
            message: `Sport post ${post._id} successfully added`
          }
          const result = Object.assign(
            { post }, response
          )
          return result;
        } else {
          const response = {
            success: false,
            message: `Sport post NOT added`
          }
          return response;
        }
      } catch (e) {
        console.log(e, "ERROR createClimbingArea");
      }
    },
  }
}

export default merge(
  resolvers, ClimbingArea);
