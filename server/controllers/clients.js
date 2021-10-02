const {client} = require('../models/index.js');

const createClient = async function (req, res) {

  let reply = await client.createClient(req.body)

  if(!reply) {
    res.send('An error occured creating the client')
  } else {
    res.send('Client Created')
  }

}

const deleteClient = async function(req, res) {


  let reply = await client.deleteClient(req.body.clientId)
  .catch(err => console.log(err));

  if(!reply) {
    res.status(400).send('Could not delete client')
  }
    res.status(200).send('Client Deleted');

}

const getAll = async function (req, res) {

  try {
    res.status(200).send(await client.getClientsAndProviders());
  }
  catch(err) {
    res.status(400).send(err)
    console.log(err);
  }

}

const modifyClient = async function (req, res) {

 let reply = await client.modifyClient(req.body.clientId, req.body.modifiedClient)
 .catch(err => console.log(err))

 if(!reply) {
   res.send('There was an error modifying client')
 } else {
  res.status(200).send(reply);
 }

}


module.exports = {
  modifyClient,
  createClient,
  deleteClient,
  getAll
}

