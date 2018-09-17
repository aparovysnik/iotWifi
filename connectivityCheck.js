import React, {Component} from 'react';
import {Platform, StyleSheet, Text, Button, View} from 'react-native';
import IotWifiController from './iotWifiController'
import RemoteNetworkList from './remoteNetworkList'
import {styles} from './styles'

type Props = {};
export default class ConnectivityCheck extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      isCheckingConnectivity: true,
      isConnected: false
    }
    IotWifiController.isConnectedToDevice((connectionSuccessful) => {
      this.setState({
        isCheckingConnectivity: false,
        isConnected: connectionSuccessful
      })
    });
  }
  render() {
    if(this.state.isCheckingConnectivity) {
      return (<View style={styles.container}>
        <Text style={styles.welcome}>Checking connectivity...</Text>
      </View>);
    } else if (this.state.isConnected) {
      return(<View style={styles.container}>
        <RemoteNetworkList />
      </View>);
    } else {
      return(<View style={styles.container}>
        <Text style={styles.welcome}>Please check your connection!</Text>
      </View>);
    }
  }
}
