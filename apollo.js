import {ApolloClient, InMemoryCache, from, HttpLink} from '@apollo/client';

const GRAPHQL_ENDPOINT =
  'https://graphql.contentstack.com/stacks/<API_KEY>?environment=<ENVIRONMENT_NAME>';

const apolloClient = () => {
  const link = new HttpLink({
    uri: GRAPHQL_ENDPOINT,
    headers: {
      access_token: '<ENVIRONMENT_SPECIFIC_DELIVERY_TOKEN>',
    },
  });

  return new ApolloClient({
    link: from([link]),
    cache: new InMemoryCache(),
  });
};
export default apolloClient;
