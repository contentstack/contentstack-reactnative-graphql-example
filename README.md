[![Contentstack](https://www.contentstack.com/docs/static/images/contentstack.png)](https://www.contentstack.com/)

# Contentstack GraphQL with the Apollo Client React-Native


## Step 1: Create a stack

Log in to your Contentstack account and [create a new stack](https://www.contentstack.com/docs/guide/stack#create-a-new-stack). This stack will hold all the data that is specific to your website. Read more about [stacks](https://www.contentstack.com/docs/guide/stack).

## Step 2: Add a publishing environment

1.  To [add an environment](https://www.contentstack.com/docs/guide/environments#add-an-environment) in Contentstack, navigate to Settings | Environment and click on the + New Environment tab.
2.  Provide a suitable name for your environment, say, ‘staging’.
3.  Specify the base URL (e.g., ‘http://YourDomainName.com’) and select the language (e.g., English - United States).
4.  Then, click on Save.  

    Read more about [environments](https://www.contentstack.com/docs/guide/environments).
    

## Step 3: Import content types

A content type is like the structure or blueprint of a page or a section of your web or mobile property. Read more about [Content Types](https://www.contentstack.com/docs/guide/content-types).  
  
For this application, basic content types is required: Product. For quick integration, we have already created these content types. You simply need to import them to your stack. (You can also [create your own content types](https://www.contentstack.com/docs/guide/content-types#creating-a-content-type). Learn how to do this).  
  

To import the content types, perform the following steps:

1.  Save the zipped folder of the JSON files given below on your local machine.
2.  Extract the files from the folder.
3.  Then, go to your stack in Contentstack. The next screen prompts you to either create a new content type or import one into your stack.
4.  Click the Import link and select the JSON file saved on your machine.  
 
Here’s a brief overview of the content types required for this project.  
-   **Product**: This content type lets you add the product content into your app.  
  
Download All Content Types

Now that all the content types are ready, let’s add some content for your news app.

## Step 4: Adding content

[Create](https://www.contentstack.com/docs/guide/content-management#add-a-new-entry) and [publish](https://www.contentstack.com/docs/guide/content-management#publish-an-entry) entries for the ‘Product’ content type.  
  
Add a few dummy entries for products for the Product content type. Save and publish these entries. Learn how to create and publish entries.  
  
With this step, you have created sample data for your application. Now, it’s time to use and configure the presentation layer.

## Step 5: Installing the Apollo framework

In order to pull data from the new Contentstack GraphQL endpoint, you need to integrate a GraphQL client library that handles sending GraphQL queries and parsing the corresponding responses. The Apollo SDK for React-Native is one of the most popular choices for a GraphQL client.

let us create React-Native application and install the dependencies related to Apollo client

```
$ react-native init ProductList
$ npm install apollo-boost react-apollo graphql-tag graphql --save
```

## Step 6: Clone and configure application

To get your app up and running quickly, we have created a sample React Native app for this project. You need to download it and change the configuration. Download the app using the command given below:
```
$ git clone https://github.com/raweng/NewsApp-iOS.git
```
## Step 7: Create Apollo Client

Create a file called apollo.js and export a funtion that accepts a token and returns an instance of Apollo Client. You have to configure the Apollo client with the GraphQL endpoint and the token. (Replace with your own GraphQL endpoint)
  
```
import { ApolloClient } from  'apollo-client';  
import { HttpLink } from  'apollo-link-http';  
import { InMemoryCache } from  'apollo-cache-inmemory';  
const GRAPHQL_ENDPOINT = `https://graphql.contentstack.io/stacks/api_key/explore?access_token=environment_specific_delivery_token&environment=environment_name`;  
  
const apolloClient = () => {  
	const link = new HttpLink({  
		uri: GRAPHQL_ENDPOINT  
	});  
}  
export  default apolloClient;
```
## Step 8: Connect your client to React

To connect Apollo Client to React, you will need to use the ApolloProvider component exported from react-apollo. The ApolloProvider is similar to React’s context provider. It wraps your React app and places the client on the context, which allows you to access it from anywhere in your component tree.
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

Once your ApolloProvider is hooked up, you’re ready to start requesting data with Query components! Query is a React component exported from react-apollo that uses the render prop pattern to share GraphQL data with your UI.


First, pass your GraphQL query wrapped in the gql function to the query prop on the Query component. Then, you’ll provide a function to the Query component’s children prop to determine what to render, which Query will call with an object containing loading, error, and data properties. Apollo Client tracks error and loading state for you, which will be reflected in the loading and error properties. Once the result of your query comes back, it will be attached to the data property.

Let’s create an FETCH_ALL_PRODUCT component in index.js to see the Query component in action!
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
 
Contentstack provides a GraphQL playground, which is a GraphiQL interface, to test your GraphQL queries in your browser. Use this interface to write and test your queries.

Open a browser of your choice and hit the URL given below:
```
https://graphql.contentstack.io/stacks/api_key/explore?access_token=environment-specific_delivery_token&environment=environment_name
  ```

Note:

-   If you have pieces of data you may want to reuse in multiple places, make use of fragments. Refer the [Using fragments](https://www.apollographql.com/docs/ios/fragments.html) doc for more details.
    
## Step 10: Build and run your application

Now that we have a working project, you can build and run it.
