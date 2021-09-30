const db = require('../database/index.js');
const { Client, Provider } = require('../database/dbModels.js');


// Get single Client by Id

const getClientById = async function (id) {
  try {
    return await Client.findById(id).lean();
  }
  catch(err) {
    console.log(err)
  }
}

// Add new Client (this will take a client object as a parameter)

const createClient = async function(client) {

  try {
    await Client.create({
      name: client.name,
      email: client.email,
      phone: client.phone,
      providers: client.providers
    })
    console.log('Client sucessfully created')
  }
  catch(err) {
    console.log(err)
  }
}

// Modify Client Information

// This adds a providerId to the client's provider array given the clients' email. Used to seed database.

const addProviderToClientUsingEmail = async function (clientEmail, providerId) {

  try {
    await Client.findOneAndUpdate({email: clientEmail}, {$push: {providers: providerId}}, {new: true})
    console.log(`Provider ${providerId} added to client`);

  }
  catch(err) {
    console.log(err)
  }

}

const modifyClient = async function(clientId, newClientObject) {
  try {
    await Client.findByIdAndUpdate(clientId, {
      name: newClientObject.name,
      email: newClientObject.email,
      phone: newClientObject.phone,
      providers: newClientObject.providers
    }, {
      lean: true,
      new: true
    }, (err, model) => {
      if (err) {
        console.log(err)
      } else {
        console.log(model);
        return model;
      }
    })
    .then(doc => {
      console.log('Right here', doc)
      return doc
    })
  }
  catch(err) {
    console.log('Promise failure error',err)
  }
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
  getClientById,
  createClient,
  deleteClient,
  modifyClient
}