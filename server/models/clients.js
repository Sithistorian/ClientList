const db = require('../database/index.js');
const { Client } = require('../database/dbModels.js');

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

const getClientByName = async function(clientName) {

  let client = await Client.find({name: clientName})
  .lean()
  .then(doc => {
    console.log(`Sucessfully read ${clientName}`);
    return doc
  })
  .catch(err => console.log(`Could not read ${clientName}`, err))

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

// Delete Client

module.exports = {
  getAllClients,
  getClientById,
  getClientByName,
  createClient
}