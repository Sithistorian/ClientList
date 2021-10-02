const {client, provider } = require('../models/index.js'); // These are the models


const createNewProvider = async function (req, res) {

  try {
    provider.createNewProvider(req.body);
    res.send(`The provider ${req.body.name} was created`);
  }
  catch(err) {
    console.log(err)
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