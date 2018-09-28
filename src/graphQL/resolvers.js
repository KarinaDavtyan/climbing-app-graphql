const resolvers = {
  Query: {
    route:()=> {
      return {
        title: 'title',
        location: {
          lat: 1,
          lon: 2
        }
      }
    },
    routes: () => {
      return [{
        title: 'title',
        location: {
          lat: 1,
          lon: 2
        }
      },{
        title: 'title2',
        location: {
          lat: 1,
          lon: 2
        }
      }
    ]
    }
  }
}

export default resolvers;
