//relative imports
const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");
require("dotenv").config();

//dependency imports
const resolvers = require("./graphql/resolvers");
const typeDefs = require("./graphql/typeDefs");

MONGODB = process.env.MONGODB;

// Apollo server setup
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
});

//database connection
mongoose
  .connect(MONGODB, { useNewUrlParser: true })
  .then(() => {
    console.log("You are connected to MongoDB");
    return server.listen({ port: 5000 });
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`);
  });

module.exports = { server };
