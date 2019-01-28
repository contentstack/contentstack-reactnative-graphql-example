/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {Scene, Router, ActionConst, Stack, Modal, Tabs, Actions}  from 'react-native-router-flux';

import apolloClient from './apollo';
import {ApolloProvider} from 'react-apollo'
import ListView from './ListView';
import Products from './Products';

type Props = {};
export default class App extends Component<Props> {
  state = {
    client: null
  }

  componentDidMount () {
    const client = apolloClient();
    this.setState({
      client
    })
  }
  render() {
    if (this.state.client == null) {
      return (<View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        </View>);
    }
    return (
      <ApolloProvider client = {this.state.client}>
        <Router>
          <Scene key = 'root' navigationBarStyle={{backgroundColor: "#e34950"}}>
            <Scene key = 'Products' 
              component = {Products}
              title = 'Products'/>
          </Scene>
        </Router>
      </ApolloProvider>
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
