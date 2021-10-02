const db = require('../database/index.js');
const { Client, Provider } = require('../database/dbModels.js');


// Add new Client (this will take a client object as a parameter)

const createClient = function(client) {

  return Client.create({
      name: client.name,
      email: client.email,
      phone: client.phone,
      providers: client.providers
    })
    .then(doc => doc, err => {
      console.log('Error occured creating client:', err);
      return null;
    })
    .catch(err => console.log(err))
}

// Modify Client Information

// This adds a providerId to the client's provider array given the clients' email. Used to seed database.

const addProviderToClientUsingEmail = async function (clientEmail, providerId) {

  try {
    await Client.findOneAndUpdate({email: clientEmail}, {$push: {providers: providerId}}, {new: true})
    .then(() => console.log(`Provider ${providerId} added to client`))
    .catch(err => console.log(err));
  }
  catch(err) {
    console.log(err)
  }

}

const modifyClient = async function(clientId, newClientObject) {

  return Client.findByIdAndUpdate(clientId, {
    name: newClientObject.name,
    email: newClientObject.email,
    phone: newClientObject.phone,
    providers: newClientObject.providers
  }, {
    lean: true,
    new: true
  })
  .then(doc => {
    console.log('Updated Client', doc)
    return doc
  })
  .catch(err => console.log('Model:', err))

}

// Delete Client

const deleteClient = async function (clientId) {

  try {
    Client.findByIdAndDelete(clientId)
    .then(res => console.log('Sucessfully removed client', res))
    .catch(err => console.log(err))
  }
  catch(err) {
    console.log(err)
  }
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
  addProviderToClientUsingEmail,
  createClient,
  deleteClient,
  modifyClient
}