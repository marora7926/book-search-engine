const { User } = require('../models');

const resolvers = {
  Query: {
    Users: async () => {
      return await User.find({});
    }
  }
};

module.exports = resolvers;