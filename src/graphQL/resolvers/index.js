import db from '../../db';

const resolvers = {
  Query: {
    route: async (root, args)=> {
      const route = await db.getRoute({_id: args._id});
      return route
    },
    climbing_area: async (root, args)=> {
      const climbing_area = await db.getClimbingArea({_id: args._id});
      return climbing_area
    }
  },
  Mutation: {
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
    }
  }
}

export default resolvers;
