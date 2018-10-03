const resolvers = {
  ClimbingArea: {
    routes: async (climbing_area) => {
      return climbing_area.routes
    }
  }
}

export default resolvers;
