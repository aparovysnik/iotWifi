export default {
  isConnectedToDevice(onSuccess) {
    return fetch('http://192.168.27.1:8080/status')
      .then(function(response) {
        return response.ok;
      })
      .then(onSuccess)
      .catch(function(error) {
        return false;
      })
  },
  listWifiNetworks(onSuccess) {
    return fetch('http://192.168.27.1:8080/scan')
      .then((response) => {
        if(!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then((response) => {
        return Object.entries(response.payload).map(([key, value]) => ({key, value}));
      })
      .then(onSuccess)
      .catch(function(error) {
        return [];
      })
  }
}
