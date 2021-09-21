const db = require('../database/index.js');
const { Client, Provider } = require('../database/dbModels.js');

// Get all Clients

const getAllClients = async function () {
  let clients = await Client.find({})
  .lean()
  .then(docs => {
    console.log('Successfully read all clients');
    return docs;
  })
  .catch(err => console.log('Could not read all clients', err))

  return clients;
}

// Get single Client by Id

const getClientById = async function (id) {
  let client = await Client.findById(id)
  .lean()
  .then(doc => {
    console.log('The client was sucessfully read');
    return doc
  })
  .catch(err => console.log('Could not get client', err))

  return client;
}

// Get single Client by name

const getClientByEmail = async function(clientEmail) {

  let client = await Client.find({email: clientEmail})
  .lean()
  .then(doc => {
    console.log('Sucessfully read client');
    return doc
  })
  .catch(err => console.log('Could not read client', err))

  return client;
}

// Add new Client (this will take a client object as a parameter)

const createClient = async function(client) {

  Client.create({
    name: client.name,
    email: client.email,
    phone: client.phone,
    providers: client.providers
  })
  .then(doc => {
    console.log('Client sucessfully created')
  })
  .catch(err => console.log('Could not create client', err))
}

// Update Client Information

// This adds a providerId to the client's provider array given the client's Id

const addProviderToClientUsingId = async function (clientId, providerId) {

  Client.findByIdAndUpdate(clientId, {$push: {providers: providerId}}, {new: true})
  .then(doc => {
    console.log(`Provider ${providerId} added to client ${clientId} `);
    return doc;
  })
  .catch(err => console.log(`Provider ${providerId} was NOT added to client ${clientId} `, err))

}

// This adds a providerId to the client's provider array given the clients' name

const addProviderToClientUsingEmail = async function (clientEmail, providerId) {

  Client.findOneAndUpdate({email: clientEmail}, {$push: {providers: providerId}}, {new: true})
  .then(doc => {
    console.log(`Provider ${providerId} added to client`);
    return doc;
  })
  .catch(err => console.log(`Provider ${providerId} was NOT added to client`, err))

}

// This adds multiple providerIds to the client's provider array

const addMultipleProvidersToClient = async function (clientId, arrayOfProvidersIds) {

  const asyncLoop = async function () {
    for (let i = 0; i < arrayOfProvidersIds.length; i++) {
      await addProviderToClientUsingId(clientId, arrayOfProvidersIds[i])
    }
  }
  asyncLoop();
}

// Remove provider from client's provider array

const removeProviderFromClient = async function (clientId, providerId) {

  Client.findByIdAndUpdate(clientId, {$pull: {providers: providerId}}, {new: true})
  .then(doc => {
    console.log(`Provider ${providerId} removed from client ${clientId} `);
    return doc;
  })
  .catch(err => console.log(`Provider ${providerId} was NOT removed from client ${clientId} `, err))
}

// Remove multiple providers at once from a client's provider array

const removeMultipleProvidersFromClient = async function(clientId, arrayOfProvidersIds) {

  let asyncLoop = async function () {
    for (let i = 0; i < arrayOfProvidersIds.length; i++) {
      await removeProviderFromClient(clientId, arrayOfProvidersIds[i])
    }
  }
  asyncLoop();
}

// Delete Client

const deleteClient = async function (clientId) {

  Client.findByIdAndDelete(clientId)
  .then(doc => {
    console.log('Sucessfully removed client');
    return doc
  })
  .catch(err => console.log('Did not remove client', err))

  }

// Get data as shown in prompt

const getClientsAndProviders = async function() {

  let promise1 = Client.find({})
  .lean()
  .then(docs => {
    docs.forEach(doc => {
      delete doc['__v'];
    })
    return docs
  })
  .catch(err => console.log('Could not read clients from database', err))

  let promise2 = Provider.find({})
  .lean()
  .then(docs => {
    docs.forEach(doc => {
      delete doc['clients'];
      delete doc['__v'];
    })
    return docs;
  })
  .catch(err => console.log('Could not read providers from database', err))

  let result = await Promise.all([promise1, promise2])
  .then(values => {
    console.log('Successfully read all clients and providers');
    let data = {};
    data.clients = values[0];
    data.providers = values[1];
    return data;
  })
  .catch(err => console.log('Something went wrong', err))
  return result
}

// Get Clients Populated

const getClientsAndProvidersPopulated = async function() {

  let promise1 = Client.find({})
  .lean()
  .populate("providers")
  .then(docs => {
    return docs
  })
  .catch(err => console.log('Error reading clients', err))

  let promise2 = Provider.find({})
  .lean()
  .populate("clients")
  .then(docs => {
    return docs
  })
  .catch(err => console.log('Error reading providers', err))

  let result = await Promise.all([promise1, promise2])
  .then(values => {
    let data = {};
    data.clients = values[0];
    data.providers = values[1];
    return data;
  })
  .catch(err => console.log('Something went wrong', err))

  return result;

}


module.exports = {
  getClientsAndProviders,
  getClientsAndProvidersPopulated,
  addProviderToClientUsingId,
  addProviderToClientUsingEmail,
  addMultipleProvidersToClient,
  removeProviderFromClient,
  removeMultipleProvidersFromClient,
  getAllClients,
  getClientById,
  getClientByEmail,
  createClient
}