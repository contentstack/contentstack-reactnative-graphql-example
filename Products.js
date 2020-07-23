import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableHighlight,
  StatusBar,
  FlatList,
} from 'react-native';
import {Query} from 'react-apollo';
import {gql} from '@apollo/client';

const FETCH_ALL_PRODUCT = gql`
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
const itemsPerRow = 2;

export default class Products extends React.Component {
  state = {
    isLoading: true,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Query query={FETCH_ALL_PRODUCT}>
        {({loading, error, data}) => {
          if (loading) {
            return (
              <>
                <StatusBar barStyle="dark-content" />
                <SafeAreaView>
                  <View style={styles.container}>
                    <Text>Loading....</Text>
                  </View>
                </SafeAreaView>
              </>
            );
          }
          if (error) {
            return (
              <>
                <StatusBar barStyle="dark-content" />
                <SafeAreaView>
                  <View style={styles.container}>
                    <Text>`Error! ${error.message}`</Text>
                  </View>
                </SafeAreaView>
              </>
            );
          }
          return (
            <>
              <StatusBar barStyle="dark-content" />
              <SafeAreaView style={styles.mainContainer}>
                <FlatList
                  data={data.all_product.items}
                  dataSource={null}
                  numColumns={itemsPerRow}
                  renderItem={(item, index) => {
                    console.log(item.item);
                    return (
                      <GridItem
                        item={item.item}
                        onPressItem={this.onPressItem}
                      />
                    );
                  }}
                />
              </SafeAreaView>
            </>
          );
        }}
      </Query>
    );
  }

  onPressItem = (item) => {
    console.log(item);
  };
}

class GridItem extends React.PureComponent {
  _onPress = (item) => {
    this.props.onPressItem(item);
  };

  render() {
    const item = this.props.item;
    console.log('safdfdf' + this.props.item.price);
    StatusBar.setBarStyle('light-content', true);
    return (
      <TouchableHighlight
        style={styles.flatlistView}
        onPress={() => this._onPress(item)}
        underlayColor="#dddddd">
        <View style={styles.flatlistView}>
          <Image
            style={styles.image}
            source={{uri: item.featured_imageConnection.edges[0].node.url}}
          />
          <Text numberOfLines={1} style={styles.name}>
            {item.title}
          </Text>
          <Text numberOfLines={2} style={styles.price}>
            ${item.price}
          </Text>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: 'center',
    flex: 1,
    paddingTop: 30,
  },
  image: {alignContent: 'center', flex: 0.8, width: 170, height: 170},
  flatlistView: {
    flex: 1,
    flexDirection: 'column',
    margin: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 200,
    paddingTop: 5,
    paddingBottom: 5,
    paddingEnd: 2,
    paddingLeft: 2,
    borderRadius: 2,
  },
  price: {
    flex: 0.1,
    textAlignVertical: 'center',
    textAlign: 'center',
    fontSize: 12,
    alignContent: 'center',
  },
  name: {
    flex: 0.1,
    textAlignVertical: 'center',
    textAlign: 'center',
    fontSize: 15,
  },
  container: {
    // flex: 1,
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
