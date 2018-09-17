/** @format */

import {AppRegistry} from 'react-native';
import ConnectivityCheck from './connectivityCheck';
import RemoteNetworkList from './remoteNetworkList';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => ConnectivityCheck);
