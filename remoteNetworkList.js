import React, {Component} from 'react';
import {Platform, StyleSheet, Text, FlatList, TouchableOpacity, View} from 'react-native';
import IotWifiController from './iotWifiController'
import NetworkDetailsForm from './networkDetailsForm'
import {styles} from './styles'

type Props = {};
export default class RemoteNetworkList extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      isRequestInProgress: true,
      remoteWifiNetworks: {},
      selectedNetworkID: null,
      selectedNetworkData: null
    }
    IotWifiController.listWifiNetworks((wifiNetworks) => {
      this.setState({
        isRequestInProgress: false,
        remoteWifiNetworks: wifiNetworks
      })
    });
  }

  onSelectNetwork(networkID, networkData) {
    this.setState({
      selectedNetworkID: networkID,
      selectedNetworkData: networkData
    })
  }

  render() {
    if(this.state.selectedNetworkID) {
      return(<Text>Your selected network is {this.state.selectedNetworkID}</Text>)
    }
    if(this.state.isRequestInProgress) {
      return (<View style={styles.container}>
        <Text style={styles.welcome}>Searching for WiFi networks...</Text>
      </View>);
    } else if (this.state.remoteWifiNetworks.length) {
      return(<><Text style={styles.welcome}>Please select a network:</Text>
        <FlatList
        data={this.state.remoteWifiNetworks}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => this.onSelectNetwork(item.key, item.value)}>
            <Text style={styles.welcome}>{item.key}</Text>
          </TouchableOpacity>
        )}
      /></>);
    } else {
      return(<View style={styles.container}>
        <Text style={styles.welcome}>No WiFi networks available.</Text>
      </View>);
    }
  }
}
