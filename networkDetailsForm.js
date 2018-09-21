import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableHighlight} from 'react-native';
import IotWifiController from './iotWifiController';
import {styles} from './styles';
import t from 'tcomb-form-native';

type Props = {};

const Form = t.form.Form;
const WifiDetails = t.struct({networkID: t.String, password: t.maybe(t.String)});

const defOptions = {
  fields: {
    networkID: {
      label: 'Network name',
      editable: false
    },
    password: {
      secureTextEntry: true
    }
  }
};

export default class NetworkDetailsForm extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      isRequestInProgress: false,
      isConnected: false,
      options: defOptions,
      value: {
        networkID: props.networkID,
        password: ''
      }
    };
  }

  onSubmit() {
    this.setState({
      isRequestInProgress: true
    });

    IotWifiController.connectToNetwork(this.refs.networkDetails.getValue(), (response) => {
      if (response.payload.state === 'COMPLETED') {
        this.setState({isConnected: true})
      } else {
        this.setState({
          options: t.update(this.state.options, {
            hasError: {'$set': true},
            error: {'$set': 'Connection attempt failed. Please check credentials and try again.'}
          })
        });
      }
      this.setState({
        isRequestInProgress: false
      })
    });
  }

  onChange(value) {
    this.setState({
      options: t.update(this.state.options, {
        hasError: {'$set': false},
        fields: {
          password: {
            hasError: {'$set': false}
          }
        }
      }),
      value: value
    });

  }

  render() {
    if(this.state.isConnected) {
      return(<View style={styles.container}>
        <Text style={styles.welcome}>Connection successful!</Text>
      </View>)
    }
    return (<View style={styles.networkDetailsForm}>
      <Form ref="networkDetails" type={WifiDetails} options={this.state.options} value={this.state.value} onChange={this.onChange.bind(this)}/>
      <TouchableHighlight onPress={this.onSubmit.bind(this)} disabled={this.state.isRequestInProgress}>
        <Text style={this.state.isRequestInProgress ? styles.welcome : styles.submit}>Connect</Text>
      </TouchableHighlight>
    </View>);
  }
}
