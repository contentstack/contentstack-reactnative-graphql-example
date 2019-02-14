import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
const GRAPHQL_ENDPOINT = `https://dev-graphql.contentstack.io/stacks/***REMOVED***?access_token=***REMOVED***&environment=production`;

const apolloClient = () => {
  const link = new HttpLink({
    uri: GRAPHQL_ENDPOINT,
    fetchOptions: {method: "GET"}
  });
  return new ApolloClient({
    link,
    cache: new InMemoryCache()
  })
}
export default apolloClient;
