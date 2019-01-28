
import React from 'react';
import {Platform, 
  StyleSheet, 
  View, 
  Text, 
  FlatList,
  TouchableHighlight,
  StatusBar} from 'react-native'
import { graphql, ApolloProvider, Query, renderToStringWithData } from 'react-apollo';
import gql from 'graphql-tag';

const FETCH_ALL_PRODUCT = gql `query {
  all_product(locale:"en-us") {
    items {
      title	
      description    
		 	price
    }
  }
}
`;



export default class ListView extends React.Component {

  state = {
    isLoading: true,
  }
    constructor(props) {  
        super(props)
    }

    componentDidMount (){

    }

    render() {
      return (
        <Query query={FETCH_ALL_PRODUCT}>
        {({ loading, error, data }) => {
          if (loading) {
            return <View style={styles.container}><Text>Loading....</Text></View>
          }
          if (error){
            return <View style={styles.container}><Text>`Error! ${error.message}`</Text></View>
          } 
          this.state.isLoading = false
          return <FlatList 
          data = {data.all_product.items}
          renderItem={this._renderItem}
          />
        }}
      </Query>
      );
    }

    _renderItem = ({item}) => (
      <ListItem
      item = {item}
      onPressItem={this.onPressItem}> 
      </ListItem>
    );

    onPressItem = (item) => {
      console.log(item);
    }
}

class ListItem extends React.PureComponent {
  _onPress = (item) => {
    this.props.onPressItem(item);
  };

  render () {
      const item = this.props.item;
      console.log(item.title);
      StatusBar.setBarStyle('light-content', true);
      return (
      <TouchableHighlight 
          onPress={() => this._onPress(item)}
            underlayColor='#dddddd'>
            <View style = {{flex: 1, 
            justifyContent: 'center',
            borderBottomColor: '#F0F0F0',
            borderBottomWidth: 1,
            maxHeight: 70,
            paddingTop: 10,
            paddingBottom:10,
            paddingEnd: 5,
            paddingLeft:5,
            borderRadius: 2}}>
            <Text numberOfLines = {1} style= {{fontSize: 15,}}>{item.title}</Text>
            <Text numberOfLines = {2} style= {{fontSize: 9, }}>{item.description}</Text>
            <View style></View>
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