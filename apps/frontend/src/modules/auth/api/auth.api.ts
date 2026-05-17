import axios from 'axios';

const GRAPHQL_ENDPOINT = 'http://localhost:4000/';

export const AuthAPI = {
  /**
   * Logs in a user using the GraphQL backend
   */
  login: async (email: string, password: string, role: string) => {
    const query = `
      mutation Login($email: String!, $password: String!, $role: String!) {
        login(input: { email: $email, password: $password, role: $role }) {
          token
          user {
            id
            username
            email
            role
          }
        }
      }
    `;

    const response = await axios.post(GRAPHQL_ENDPOINT, {
      query,
      variables: {
        email,
        password,
        role: role.toUpperCase(),
      }
    });

    if (response.data.errors) {
      throw new Error(response.data.errors[0].message);
    }

    return response.data.data.login; // returns { token, user }
  }
};
