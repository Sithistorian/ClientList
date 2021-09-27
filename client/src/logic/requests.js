const axios = require('axios');

//Gets

const getAll = function (populated = 'false') {

    var config = {
      method: 'get',
      url: `http://localhost:3000/all/?populated=${populated}`
    };

    axios(config)
    .then(function (res) {
      console.log(res.data)
      this.information = res.data
      return res.data;
    })
    .catch(function(err) {
      console.log('Something went wrong', err)
    });
  }

const getClientById = function(clientId) {
  var config = {
    method: 'get',
    url: `http://localhost:3000/clients/id/${clientId}`
  };

  axios(config)
  .then(res => {
    console.log(JSON.stringify(res.data))
    return JSON.stringify(res.data);
  })
  .catch(err => console.log('Something went wrong', err));
}

const getProviderById = function(ProviderId) {
  var config = {
    method: 'get',
    url: `http://localhost:3000/providers/id/${ProviderId}`
  };

  axios(config)
  .then(res => {
    console.log(JSON.stringify(res.data))
    return JSON.stringify(res.data);
  })
  .catch(err => console.log('Something went wrong', err));
}

// Posts

const createClient = function(client) {
  var data = JSON.stringify(client);

  var config = {
    method: 'post',
    url: 'http://localhost:3000/clients/createClient/',
    headers: {
      'Content-Type': 'application/json'
    },
    data : data
  };

  axios(config)
  .then(res => console.log(JSON.stringify(res.data)))
  .catch(err => console.log('Something went wrong', err));
}

const createNewProvider = function(provider) {
  var data = JSON.stringify(provider);

  var config = {
    method: 'post',
    url: 'http://localhost:3000/providers/createNewProvider/',
    headers: {
      'Content-Type': 'application/json'
    },
    data : data
  };

  axios(config)
  .then(res => console.log(JSON.stringify(res.data)))
  .catch(err => console.log('Something went wrong', err));
}

const deleteClient = function(clientId) {

  var data = JSON.stringify({
    "clientId": clientId
  });

  var config = {
    method: 'post',
    url: 'http://localhost:3000/clients/deleteClient/',
    headers: {
      'Content-Type': 'application/json'
    },
    data : data
  };

  axios(config)
  .then(res => console.log(JSON.stringify(res.data)))
  .catch(err => console.log('Something went wrong', err));

}

const deleteProvider = function(providerId) {
  var data = JSON.stringify({
    "providerId": providerId
  });

  var config = {
    method: 'post',
    url: 'http://localhost:3000/providers/deleteProvider',
    headers: {
      'Content-Type': 'application/json'
    },
    data : data
  };

  axios(config)
  .then(res => {
    console.log(res.data);
  })
  .catch(err => console.log(err));
}

deleteProvider("614ba577cfd01ff4f5107649")

// Puts

const changeProviderName = function(obj) {
  var data = JSON.stringify(obj);

  var config = {
    method: 'put',
    url: 'http://localhost:3000/providers/changeName',
    headers: {
      'Content-Type': 'application/json'
    },
    data : data
  };

  axios(config)
  .then(res => console.log(JSON.stringify(res.data)))
  .catch(err => console.log('Something went wrong', err));
}

const modifyClient = function(obj) {
  var data = JSON.stringify(obj);

  var config = {
    method: 'put',
    url: 'http://localhost:3000/clients/modifyClient',
    headers: {
      'Content-Type': 'application/json'
    },
    data : data
  };

  axios(config)
  .then(res => console.log(JSON.stringify(res.data)))
  .catch(err => console.log('Something went wrong', err));
}

module.exports = {
  modifyClient,
  deleteProvider,
  createClient,
  changeProviderName,
  deleteClient,
  createNewProvider,
  getProviderById,
  getClientById,
  getAll
}
