[![Contentstack](https://www.contentstack.com/docs/static/images/contentstack.png)](https://www.contentstack.com/)

[!WARNING]
**This repo is deprecated and no longer maintained. Security updates are not supported. We recommend avoiding its use.**

**Note:** This app is no longer maintained. It remains available for reference. If you have questions regarding this, please reach out to our [support team](mailto:support@contentstack.com) and we will do our best to help!

# Build an example app using Contentstack GraphQL API, and Apollo Client

We have created a sample product catalog app that is built using Apollo Client SDK. The content of this app is powered by Contentstack GraphQL APIs, and the app uses Apollo client on the client side to consume GraphQL APIs.

This document covers the steps to get this app up and running for you. Try out the app and play with it, before building bigger and better applications.

| ![](https://github.com/contentstack/contentstack-reactnative-graphql-example/raw/master/iOS.png) | ![](https://github.com/contentstack/contentstack-reactnative-graphql-example/raw/master/Android.png) |
| ------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------- |

## Prerequisite

- Use [Xcode 11.1 and later](https://developer.apple.com/xcode/) Mac OS X 10.15 and later (for iOS)
- Use Latest version of Android Studio (for Android)
- React Native [setup](https://facebook.github.io/react-native/docs/getting-started.html)
- [Contentstack](https://www.contentstack.com/) account
- [Basic knowledge of Contentstack](https://www.contentstack.com/docs/)

## Step 1: Create a stack

Log in to your Contentstack account and [create a new stack](https://www.contentstack.com/docs/guide/stack#create-a-new-stack). Read more about [stacks](https://www.contentstack.com/docs/guide/stack).

## Step 2: Add a publishing environment

[Add a publishing environment](https://www.contentstack.com/docs/guide/environments#add-an-environment) to publish your content in Contentstack. Provide the necessary details as per your requirement. Read more about [environments](https://www.contentstack.com/docs/guide/environments).

## Step 3: Import content types

For this app, we need one content type: Product Here’s what it is needed for:

- **Product**: Lets you add the product content into your app

For quick integration, we have already created the content type. [Download the content types](https://github.com/contentstack/contentstack-reactnative-graphql-example/raw/master/ContentTypes.zip) and [import](https://www.contentstack.com/docs/guide/content-types#importing-a-content-type) it to your stack. (If needed, you can [create your own content types](https://www.contentstack.com/docs/guide/content-types#creating-a-content-type). Read more about [Content Types](https://www.contentstack.com/docs/guide/content-types)

Now that all the content types are ready, let’s add some content for your Product app.

## Step 4: Add content

[Create](https://www.contentstack.com/docs/guide/content-management#add-a-new-entry) and [publish](https://www.contentstack.com/docs/guide/content-management#publish-an-entry) entries for the 'Product' content type.

Now that we have created the sample data, it’s time to use and configure the presentation layer.

## Step 5: Clone and configure application

To get your app up and running quickly, we have created a sample React Native app for this project. You need to download it and change the configuration. Download the app using the command given below:

```
$ git clone https://github.com/contentstack/contentstack-reactnative-graphql-example.git
```

Once you have downloaded the project, add your Contentstack API Key, Delivery Token, and Environment to the project during the SDK initialization step. (Learn how to find your Stack's [API Key and Delivery Token](https://www.contentstack.com/docs/guide/stack#edit-a-stack).

## Step 6: Install the Apollo Framework

Using Apollo Boost you can easily configure Apollo Client with the recommended settings in your app.

Let's create a React-Native application, and use Apollo Boost to include packages that are essential for building the Apollo app.

```
$ react-native init ProductList
$ npm install @apollo/client react-apollo graphql --save
```

## Step 7: Create Apollo Client

Create a file named `apollo.js` and export a function that accepts a token and returns an instance of Apollo Client. You have to configure the Apollo client with the GraphQL endpoint and the token. (Replace with your own GraphQL endpoint)

```
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
```

## Step 8: Connect your client to React

To connect Apollo Client to React, you need to use the `ApolloProvider` component exported from `react-apollo`. The `ApolloProvider` component wraps your React app and places the client on the context, which allows you to access it from anywhere in your component tree.

```
import React, {Component} from 'react';
import {Router, Scene} from 'react-native-router-flux';
import apolloClient from './apollo';
import {ApolloProvider} from 'react-apollo';
import Products from './Products';

class App extends Component {
  state = {
    client: apolloClient(),
  };

  render() {
    return (
      <ApolloProvider client={this.state.client}>
        <Router>
          <Scene key="root">
            <Scene
              key="Products"
              component={Products}
              title="Products"
              initial={true}
            />
          </Scene>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
```

## Step 9: Write GraphQL queries

Contentstack provides a GraphQL playground, which is a GraphiQL interface, to test your GraphQL queries in your browser. Use this interface to write and test your queries.

Open a browser of your choice and hit the URL given below:

```
https://www.contentstack.com/docs/developers/apis/graphql-content-delivery-api/explorer/
```

**Note**: If you have pieces of data you may want to reuse in multiple places, make use of fragments. Refer the [Using fragments](https://www.apollographql.com/docs/ios/fragments.html) doc for more details.

## Step 10: Fetch data using Apollo Client

Once you have set up `ApolloProvider` while connecting your client to React, you can start requesting data using `Query`, which is a React component exported from `react-apollo`.

Create the `FETCH_ALL_PRODUCT` component in `index.js`, add the following code snippet, and run it to see the `Query` component in action!

```
import {Query} from 'react-apollo';
import {gql} from '@apollo/client';

const FETCH_ALL_PRODUCT = gql `
query {
  all_product(locale: "en-us") {
    items {
      title
      description
      price
      featured_imageConnection(limit: 10) {
        edges {
          node {
            url
          }
        }
      }
    }
  }
}
`;

export  default  class  Products  extends  React.Component  {

	render() {
		return(
			<Query  query = {FETCH_ALL_PRODUCT}>
			{({ loading, error, data }) => {
				if (loading) {
					return <View  style={styles.container}><Text>Loading....</Text></View>
				}
				if (error){
					return <View  style={styles.container}><Text>`Error! ${error.message}`</Text></View>
				}
				return <FlatList
				data = {data.all_product.items}
				renderItem=({item}) => (
					<Text  numberOfLines = {1}  style= {{textAlign: "center", fontSize:  15,}}>{item.title}</Text>
				);
				/>
			}}
			</Query>
		);
	}
}
```

## Step 11: Build and run your application

Now that we have a working project, you can build and run it.

## More Resources

- [Getting started with React Native SDK](https://www.contentstack.com/docs/platforms/react-native)
- [Using GraphQL queries with Apollo client React Native SDK](https://www.contentstack.com/docs/guide/contentstack-graphql-api/using-graphql-with-apollo-client-react-native-sdk)
- [GraphQL API documentation](https://www.contentstack.com/docs/apis/graphql-content-delivery-api/)
