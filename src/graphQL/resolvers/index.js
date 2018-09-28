import db from '../../db';

const resolvers = {
  Query: {
    route:()=> {
      return {
        title: 'title'
      }
    },
    routes: async () => {
      const routes = await db.getRoutes();
      return routes
    }
  },
  Mutation: {
    postRoute: async (root, args) => {
      const data = {
        title: args.title
      }
      await db.postRoute({ data })
      return {
        data
      }
    }
  }
}

export default resolvers;
