const {client, provider } = require('../models/index.js'); // These are the models


const createNewProvider = async function (req, res) {

  let reply = await provider.createNewProvider(req.body)
  .catch(err => console.log(err));

  if(!reply) {
    res.status(400).send('An error occured creating the provider')
  } else {
    res.status(200).send(`The provider ${req.body.name} was created`);
  }

}

const changeProviderName = async function (req, res) {

  try {
    provider.changeProviderName(req.body.currentProviderName, req.body.newProviderName);
    res.send(`${req.body.currentProviderName} has been changed to ${req.body.newProviderName}`)
  }
  catch(err) {
    console.log(err)
  }
}

const deleteProvider = async function (req, res) {
  try {
    provider.deleteProvider(req.body.providerId);
    res.send('provider deleted');
  }
  catch(err) {
    console.log(err)
  }

}


module.exports = {
  createNewProvider,
  changeProviderName,
  deleteProvider
}