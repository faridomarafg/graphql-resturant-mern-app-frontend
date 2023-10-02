import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_BACKEND_URL, // Your GraphQL server endpoint
});

const authToken = localStorage.getItem('token');

const authLink = setContext((_, { headers }) => {
  // Add the authorization token to the headers
  return {
    headers: {
      ...headers,
      authorization: authToken ? `Bearer ${authToken}` : '', // Use Bearer token format
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;