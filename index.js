const { ApolloServer, PubSub } = require("apollo-server");
const mongoose = require("mongoose");

const dotenv = require("dotenv");
const resolvers = require("./graphql/resolvers");
const typeDefs = require("./graphql/typeDefs");

dotenv.config();
const pubsub = new PubSub();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubsub }),
});

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Connected");
    return server.listen({ port: PORT });
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`);
  })
  .catch((err) => {
    console.error(err);
  });
