const { gql } = require("apollo-server-express");
const { describe } = require("node:test");

const { ApolloClient, InMemoryCache } = require("@apollo/client");

// intialize apollo client
const client = new ApolloClient({
  uri: "http://localhost:5000",
  cache: new InMemoryCache(),
});

// test suite
describe("Testing User CRUD", () => {
  it("Blank password is not allowed", async () => {
    const createUser = gql`
      mutation {
        register(
          registerInput: {
            username: "Anakin Skywalker"
            password: ""
            confirmPassword: ""
            email: "123@gmaiul.com"
          }
        ) {
          createdAt
          id
          email
          token
          username
        }
      }
    `;

    await expect(
      client.mutate({
        mutation: createUser,
      })
    ).rejects.toThrowError("Errors");
  });

  //test case 2 - email is not valid
  it("Email not valid", async () => {
    const createUser = gql`
      mutation {
        register(
          registerInput: {
            username: "A"
            password: "1234"
            confirmPassword: "1234"
            email: "dd123123.com"
          }
        ) {
          createdAt
          id
          email
          token
          username
        }
      }
    `;

    await expect(
      client.mutate({
        mutation: createUser,
      })
    ).rejects.toThrowError("Errors");
  }),
    //test case 3
    it("Should create a new user", async () => {
      const createUser = gql`
        mutation {
          register(
            registerInput: {
              username: "Anakin Skywalker"
              password: "123"
              confirmPassword: "123"
              email: "123@gmaiul.com"
            }
          ) {
            createdAt
            id
            email
            token
            username
          }
        }
      `;

      await expect(
        client.mutate({
          mutation: createUser,
        })
      ).rejects.toThrowError("Username is taken");
    });

  // test case 4
  it("Password not same", async () => {
    const createUser = gql`
      mutation {
        register(
          registerInput: {
            username: "Rick Sanchez"
            password: "1234"
            confirmPassword: "123"
            email: "12377777@gmaiul.com"
          }
        ) {
          createdAt
          id
          email
          token
          username
        }
      }
    `;

    await expect(
      client.mutate({
        mutation: createUser,
      })
    ).rejects.toThrowError("Errors");
  });

  //test case 5
  it("Should create a new user", async () => {
    const createUser = gql`
      mutation {
        register(
          registerInput: {
            username: "Anakin Skywalker"
            password: "123"
            confirmPassword: "123"
            email: "123@gmaiul.com"
          }
        ) {
          createdAt
          id
          email
          token
          username
        }
      }
    `;

    await expect(
      client.mutate({
        mutation: createUser,
      })
    ).rejects.toThrowError("Username is taken");
  });
});

// Referece :
// https://dev.to/neshaz/testing-graphql-server-in-nodejs-55cm

// https://blog.logrocket.com/writing-end-to-end-tests-for-graphql-servers-using-jest/
