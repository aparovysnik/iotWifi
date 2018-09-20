export default {
  isConnectedToDevice(onResult) {
    return Promise.race([
      fetch('http://192.168.27.1:8080/status'),
      new Promise((resolve, reject) =>
        setTimeout(() => reject(new Error('timeout')), 5000)
      ).then(onResult(false))
    ]).then((response) => {
      if(response) {
        onResult(response.ok)
      } else {
        onResult(false)
      }
    })
    .catch(() => onResult(false))
  },

  listWifiNetworks(onSuccess, onError) {
    return fetch('http://192.168.27.1:8080/scan')
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then((response) => {
        return Object.entries(response.payload).map(([key, value]) => ({
          key,
          value
        }));
      })
      .then(onSuccess)
      .catch(onError)
  },

  connectToNetwork(networkDetails, onResult, onError) {
    return fetch('http://192.168.27.1:8080/connect', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "ssid": networkDetails.networkID,
          "psk": networkDetails.password
        })
      })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then(onResult)
      .catch(onError)
  }
}
