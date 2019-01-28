import React from 'react';
import {Platform, 
  StyleSheet, 
  View, 
  Text,
  Image, 
  TouchableHighlight,
  StatusBar} from 'react-native'
import { graphql, ApolloProvider, Query, renderToStringWithData } from 'react-apollo';
import GridView from 'react-native-gridview'
import gql from 'graphql-tag';
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
const itemsPerRow = 2;

export default class Products extends React.Component {

    state = {
        isLoading: true,
    }
    
    constructor(props) {  
        super(props)
    }

    render() {
      return(
        <Query query = {FETCH_ALL_PRODUCT}>
          {({ loading, error, data }) => {
              if (loading) {
                return <View style={styles.container}><Text>Loading....</Text></View>
              }
              if (error){
                return <View style={styles.container}><Text>`Error! ${error.message}`</Text></View>
              } 
              return <GridView
                      data={data.all_product.items}
                      dataSource={null}
                      itemsPerRow = {itemsPerRow}
                      renderItem={(item) => {
                        return (
                          <GridItem item = {item}
                                    onPressItem={this.onPressItem}/>
                        );
                      }}
                    />
          }}
        </Query>
      );
    }

    onPressItem = (item) => {
      console.log(item);
    }
}

class GridItem extends React.PureComponent {
  _onPress = (item) => {
    this.props.onPressItem(item)
  };

  render () {
      const item = this.props.item;
      StatusBar.setBarStyle('light-content', true);
      return (
      <TouchableHighlight 
            onPress={() => this._onPress(item)}
            underlayColor='#dddddd'>
            <View style = {{flex: 1, 
            justifyContent: 'center',
            alignItems:'center',
            minHeight: 200,
            paddingTop: 5,
            paddingBottom:5,
            paddingEnd: 2,
            paddingLeft:2,
            borderRadius: 2}}>
            <Image
                style={{alignContent:'center', flex:0.8, width: 170, height:170}}
                source={{uri: item.featured_image[0].url,
                        cache: 'only-if-cached'}}/>
            <Text numberOfLines = {1} style= {{ flex:0.1,textAlignVertical: "center", textAlign: "center", fontSize: 15,}}>{item.title}</Text>
            <Text numberOfLines = {2} style= {{ flex:0.1,textAlignVertical: "center", textAlign: "center",fontSize: 12, alignContent: 'center'}}>${item.price}</Text>
            </View>
      </TouchableHighlight>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});