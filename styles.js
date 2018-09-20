import {StyleSheet} from 'react-native';


export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  networkDetailsForm: {
    width: '70%',
    maxWidth: 500
  },
  submit: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: 15,
    textAlign: 'center',
    display: 'flex',
    fontSize: 16,
  },
  error: {
    color: 'red',
    fontSize: 16
  },
  listItem: {
    fontSize: 20,
    width: '90%',
    margin: 10
  }

});
