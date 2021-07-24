const jwt = require('jsonwebtoken');

// set token secret and expiration date
const secret = 'mysecretkey';
const expiration = '2h';

module.exports = {
  // function for our authenticated routes
  authMiddleware: function ({ req }) {
    // allows token to be sent via via req.body, req.query, or headers
    let token = req.body.token || req.query.token || req.headers.authorization;
    // Here we are spliting the token string ["Bearer", "<tokenvalue>"] into an array and return actual token from this 
      if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }
    // if token is not valid 
    if (!token) {
      return req;
    }
    // verify token and if token can be verified, add the decoded user's data to the request so it can be accessed in the resolver.
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log('Invalid token');
    }
    // return the request object so it can be passed to the resolver as `context`
    return req;
  },
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
