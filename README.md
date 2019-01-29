[![Contentstack](https://www.contentstack.com/docs/static/images/contentstack.png)](https://www.contentstack.com/)

# Contentstack GraphQL with the Apollo Client React-Native

Apollo Client provides the best way to use GraphQL to build client applications as you can use it to quickly build a UI that fetches data with GraphQL, and you can use any JavaScript front-end.

Using Apollo Boost you can easily configure Apollo Client with the recommended settings in your app. Apollo Boost includes packages that are essential for building an Apollo app.

| ![](https://github.com/contentstack/contentstack-ios-conferenceapp/raw/master/Conferenceapp/Resource/SessionScreen.png) |  ![](https://github.com/contentstack/contentstack-ios-conferenceapp/raw/master/Conferenceapp/Resource/Schedulesession.png)|
|--|--|


## Prerequisite

-  Use [Xcode 10.1 and later](https://developer.apple.com/xcode/)
-  Use Latest version of Android Studio (for Android)
-  React Native [setup](https://facebook.github.io/react-native/docs/getting-started.html)
- [Contentstack](https://www.contentstack.com/) account

## Step 1: Create a stack

Log in to your Contentstack account and [create a new stack](https://www.contentstack.com/docs/guide/stack#create-a-new-stack). Read more about [stacks](https://www.contentstack.com/docs/guide/stack).

## Step 2: Add a publishing environment

[Add a publishing environment](https://www.contentstack.com/docs/guide/environments#add-an-environment) to publish your content in Contentstack. Provide the necessary details as per your requirement. Read more about [environments](https://www.contentstack.com/docs/guidtens).

## Step 3: Import content types
For this app, we need one content type: Product Here’s what it is needed for:
-   **Product**: Lets you add the product content into your app

For quick integration, we have already created the content type. [Download the content types](https://github.com/contentstack/contentstack-reactnative-graphql-example/raw/master/ContentTypes.zip) and [import](https://www.contentstack.com/docs/guide/content-types#importing-a-content-type) it to your stack. (If needed, you can [create your own content types](https:/cs/guide/content-types#rting-a-content-type). Read more about [Content Types](https://www.contentstack.com/docs/guide/content-types)

Now that all the content types arecredy, let’s add some content for your Product app.

## Step 4: Add content

[Create](https://www.contentstack.com/docs/guide/content-management#add-a-new-entry) and [publish](https://www.contentstack.com/docs/guide/content-management#publish-an-entry) entries for thereti-content type.

Now that we have created the sample data, it’s time to use and configure the presentation layer.

## Step 5: Clone and configure application

To get your app up and running quickly, we have created a sample React Native app for this project. You need to download it and change the configuration. Download the app using the command given below:
```
$ git clone https://github.com/contentstack/contentstack-reactnative-graphql-example.git
```
## Step 6: Install the Apollo Framework
Using Apollo Boost you can easily configure Apollo Client with the recommended settings in your app. 

Let's create a React-Native application, and use Apollo Boost to include packages that are essential for building the Apollo app.
```
$ react-native init ProductList
$ npm install apollo-boost react-apollo graphql-tag graphql --save
```
## Step 7: Create Apollo Client

Create a file named `apollo.js` and export a funtion that accepts a token and returns an instance of Apollo Client. You have to configure the Apollo client with the GraphQL endpoint and the token. (Replace with your own GraphQL endpoint)
```
import { ApolloClient } from  'apollo-client';  
import { HttpLink } from  'apollo-link-http';  
import { InMemoryCache } from  'apollo-cache-inmemory';  
const GRAPHQL_ENDPOINT = `https://graphql.contentstack.io/stacks/api_key/explore?access_token=environment-specific_delivery_token&environment=environment_name`;  
  
const apolloClient = () => {  
	const link = new HttpLink({  
		uri: GRAPHQL_ENDPOINT  
	});  
}  
export  default apolloClient;
```
## Step 8: Connect your client to React

To connect Apollo Client to React, you need to use the `ApolloProvider` component exported from `react-apollo`. The `ApolloProvider` component wraps your React app and places the client on the context, which allows you to access it from anywhere in your component tree.
```
import {ApolloProvider} from  'react-apollo'  
export  default  class App extends Component<{}> {  
	render() {  
		return (  
			<ApolloProvider client = {this.state.client}>  
			<Grid>  
			</ApolloProvider>  
		);  
	}  
}
```
## Step 9: Write GraphQL queries
Contentstack provides a GraphQL playground, which is a GraphiQL interface, to test your GraphQL queries in your browser. Use this interface to write and test your queries.

Open a browser of your choice and hit the URL given below:
```
https://graphql.contentstack.io/stacks/api_key/explore?access_token=environment-specific_delivery_token&environment=environment_name
  ```

**Note**: If you have pieces of data you may want to reuse in multiple places, make use of fragments. Refer the [Using fragments](https://www.apollographql.com/docs/ios/fragments.html) doc for more details.
    
## Step 10: Fetch data using Apollo Client

Once you have set up `ApolloProvider` while connecting your client to React, you can start requesting data using `Query`, which is a React component exported from `react-apollo`.

Create the `FETCH_ALL_PRODUCT` component in `index.js`, add the following code snippet, and run it to see the `Query` component in action!
```
import {Query} from  'react-apollo';  
import gql from  'graphql-tag';  
  
const FETCH_ALL_PRODUCT = gql `query {  
	all_product(locale:"en-us") {  
		items {  
			title  
			description  
			price  
			featured_image {  
				url  	
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
