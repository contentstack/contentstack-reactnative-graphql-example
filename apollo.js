import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
const GRAPHQL_ENDPOINT = `https://graphql.contentstack.com/stacks/blt292960b854e5170e?environment=development&access_token=csf77a123fda5cc627a0363a49`;

const apolloClient = () => {
  const link = new HttpLink({
    uri: GRAPHQL_ENDPOINT,
  });
  return new ApolloClient({
    link,
    cache: new InMemoryCache()
  })
}
export default apolloClient;
