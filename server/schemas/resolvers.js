const { User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    // By adding context to our query, we can retrieve the logged in user without specifically searching for them
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id })
        .populate('savedBooks');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      // First we create the user
      const user = await User.create({ username, email, password });
      // To reduce friction for the user, we immediately sign a JSON Web Token and log the user in after they are created
      const token = signToken(user);
      // Return an `Auth` object that consists of the signed token and user's information
      return { token, user };
    },

    login: async (parent, { email, password }) => {
      // Look up the user by the provided email address. Since the `email` field is unique, we know that only one person will exist with that email
      const user = await User.findOne({ email });
      // If there is no user with that email address, return an Authentication error stating so
      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }
      // If there is a user found, execute the `isCorrectPassword` instance method and check if the correct password was provided
      const correctPw = await user.isCorrectPassword(password);
      // If the password is incorrect, return an Authentication error stating so
      if (!correctPw) {
        throw new AuthenticationError('Incorrect login credentials');
      }
      // If email and password are correct, sign user into the application with a JWT
      const token = signToken(user);
      // Return an `Auth` object that consists of the signed token and user's information
      return { token, user };
    },

    // Add a third argument to the resolver to access data in our `context` using valid JWT
    saveBook: async (parent, args, context) => {
        // If context has a `user` property, that means the user executing this mutation has a valid JWT and is logged in
        if (context.user) {  
          const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: args.bookInput } },
          { 
            new: true,
            runValidators: true,
          }
        );    
        return updatedUser;
      }   
      throw new AuthenticationError('You need to be logged in!');
    },

    // Set up mutation so a logged in user can only remove their books and no one else's
    removeBook: async (parent, args, context) => {
      console.log (args, context)
      if(context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: { bookId: args.bookId } } },
          { new: true }

        );
        return updatedUser;
      }
      throw new AuthenticationError('You need to be logged in!');
    }
  }
};

module.exports = resolvers;