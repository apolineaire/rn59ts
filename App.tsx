import React from 'react';
import { Text } from 'react-native'
import env from './config/env_variables';
import ApolloClient, { gql } from "apollo-boost";
import { ApolloProvider } from 'react-apollo';


const client = new ApolloClient({
  uri: env.APOLLO_SERVER_URL
});



export default class App extends React.Component {

  state = {
    users: []
  }

  componentDidMount() {

    client
      .query({
        query: gql`
        {
          getUsers {
            email
          }
        }
      `
      })
      .then(result => this.setState({
        users: result
      }, () => console.log("State set in App.tsx", this.state)));

  }

  render() {
    return (
      <ApolloProvider client={client}>
        <Text>App works!</Text>
      </ApolloProvider>
    );
  }
};

