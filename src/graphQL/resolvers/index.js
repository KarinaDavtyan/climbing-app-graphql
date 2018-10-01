import db from '../../db';

const resolvers = {
  Query: {
    route: async (root, args)=> {
      const route = await db.getRoute({_id: args._id});
      return route
    }
  },
  Mutation: {
    createRoute: async (root, args) => {
      try {
        const data = {
          name: args.route.name,
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
    }
  }
}

export default resolvers;
