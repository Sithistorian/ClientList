const {client, provider } = require('../models/index.js');

const getClientById = async function (req, res) {

  try {
    res.send(await client.getClientById(req.params.clientId))
  }
  catch(err) {
    console.log(err)
  }

}

const createClient = async function (req, res) {

  try {
    await client.createClient(req.body)
    res.send('Client created')
  }
  catch(err) {
    console.log(err)
  }



}

const deleteClient = function(req, res) {

  try {
    client.deleteClient(req.body.clientId)
    res.send('Client Deleted')
  }
  catch(err) {
    console.log(err)
  }
}

const getAll = function (req, res) {

  if (req.query.populated === 'true') {
    client.getClientsAndProvidersPopulated()
    .then(doc => {
      res.send(doc);
    })
    .catch(err => console.log('Something went wrong', err))
  } else {
    client.getClientsAndProviders()
    .then(doc => {
      res.send(doc);
    })
    .catch(err => console.log('Something went wrong', err))
  }
}

const modifyClient = function (req, res) {

  client.modifyClient(req.body.clientId, req.body.modifiedClient)
  .then(() => {
    res.send('Client modified')
  })
  .catch(err => console.log('Something went wrong', err))

}




module.exports = {
  getClientById,
  modifyClient,
  createClient,
  deleteClient,
  getAll
}

