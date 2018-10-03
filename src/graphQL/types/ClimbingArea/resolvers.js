const resolvers = {
  ClimbingArea: {
    routes: async (climbing_area) => climbing_area.routes;
  }
}

export default resolvers;
