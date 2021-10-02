const {client} = require('../models/index.js');

const getClientById = async function (req, res) {

  try {
    res.send(await client.getClientById(req.params.clientId))
  }
  catch(err) {
    console.log(err)
  }

}

const createClient = async function (req, res) {

  let reply = await client.createClient(req.body)

  if(!reply) {
    res.send('There was an error creating client')
  } else {
    res.send('Client Created')
  }

}

const deleteClient = async function(req, res) {

  try {
    await client.deleteClient(req.body.clientId);
    res.send('Client Deleted');
  }
  catch(err) {
    console.log(err)
  }
}

const getAll = async function (req, res) {

  if (req.query.populated === 'true') {
    try {
      res.send(await client.getClientsAndProvidersPopulated());
    }
    catch(err) {
      console.log(err);
    }
  } else {
    try {
      res.send(await client.getClientsAndProviders());
    }
    catch(err) {
      console.log(err);
    }
  }
}

const modifyClient = async function (req, res) {

  try {
   await client.modifyClient(req.body.clientId, req.body.modifiedClient);
   res.send('Client Updated')
  }
  catch(err) {
    console.log(err)
  }

}


module.exports = {
  getClientById,
  modifyClient,
  createClient,
  deleteClient,
  getAll
}

