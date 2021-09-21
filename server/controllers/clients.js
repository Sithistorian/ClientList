const {client, provider } = require('../models/index.js');



const getClientById = async function (req, res) {

  console.log('Here', req.params.clientId)

  let responseData = await client.getClientById(req.params.clientId)

  res.send(responseData)
}


const createClient = async function (req, res) {

  client.createClient(req.body)
  .then(() => res.send('Client created'))
  .catch(err => console.log('Something went wrong', err))
}

const addProvidersToClient = async function (req, res) {

  if (typeof(req.body.providers) === 'string') {
    client.addProviderToClientUsingId(req.body.clientId, req.body.providerId)
    .then(() => res.send('Provider added to Client'))
    .catch(err => console.log('Something went wrong', err))
  }
  if (Array.isArray(req.body.providers)) {
    client.addMultipleProvidersToClient(req.body.clientId, req.body.arrayOfProvidersIds)
    .then(() => res.send('Providers have been added'))
    .catch(err => console.log('An error occured', err))
  }
}


const addProviderToClientUsingId = async function (req, res) {

client.addProviderToClientUsingId(req.body.clientId, req.body.providerId)
.then(() => res.send('Provider added to Client'))
.catch(err => console.log('Something went wrong', err))
}


const addMultipleProvidersToClient = async function (req, res) {

  client.addMultipleProvidersToClient(req.body.clientId, req.body.arrayOfProvidersIds)
  .then(() => res.send('Providers have been added'))
  .catch(err => console.log('An error occured', err))
}

const removeProviderFromClient = async function (req, res) {
  client.removeProviderFromClient(req.body.clientId, req.body.providerId)
  .then(() => res.send('Provider removed'))
  .catch(err => console.log('Something went wrong', err))
}

const removeMultipleProvidersFromClient = async function(req, res) {
  client.removeMultipleProvidersFromClient(req.body.clientId, req.body.arrayOfProvidersIds)
  .then(() => res.send('Providers removed from client'))
  .catch(err => console.log('Something went wrong', err))
}

const deleteClient = async function(req, res) {
  client.deleteClient(req.body.clientId)
  .then(() => res.send('Client Deleted'))
  .catch(err => console.log('Something went wrong', err))
}

const getClientsAndProviders = async function(req, res){
  client.getClientsAndProviders()
  .then(doc => {
    res.send(doc);
  })
  .catch(err => console.log('Something went wrong', err))
}

const getClientsAndProvidersPopulated = async function(req, res){
  client.getClientsAndProvidersPopulated()
  .then(doc => {
    res.send(doc);
  })
  .catch(err => console.log('Something went wrong', err))
}


module.exports = {
  getClientById,
  createClient,
  addProviderToClientUsingId,
  addMultipleProvidersToClient,
  removeProviderFromClient,
  removeMultipleProvidersFromClient,
  deleteClient,
  getClientsAndProviders,
  getClientsAndProvidersPopulated,
  addProvidersToClient
}

