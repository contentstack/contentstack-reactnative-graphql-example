/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

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
