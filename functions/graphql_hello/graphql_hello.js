const { ApolloServer, gql } = require("apollo-server-lambda");

const faunadb = require('faunadb')
const q = faunadb.query

const typeDefs = gql`
  type Query {
    message: String,
    user: User
  }
  type User {
    name: String,
    age: Int
  }
`;

const resolvers = {
  Query: {
    // message: (parent, args, context) => {
    //   return "Hello, world from Osama!";
    // },

    message: async (parent, args, context) => {

      try {

        const client = new faunadb.Client({ secret: "fnAET9Xi80ACSe9lRoMd2PzdOJFZz2rbLF88dlK0" })
        

        let result = await client.query(
          q.Get(q.Ref(q.Collection('posts'), '309514306918023753'))
        );

        return result.data.title;
        
      } catch (error) {
        return error.toString()
      }
    },
    user: (parent, args, context) => {
      return {
        name: "Osama Ameer",
        age: 22
      };
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  introspection: true
});

exports.handler = server.createHandler();

