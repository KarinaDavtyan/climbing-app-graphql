import db from '../../../db';

const resolvers = {
  ClimbingArea: {
    routes: async (climbing_area) => {
      const routes = await db.getRoutesByClimbingAreaName({ climbing_area_name: climbing_area.name})
      return routes;
    }
  }
}

export default resolvers;
