const {client, provider } = require('../models/index.js'); // These are the models


const getProviderById = async function (req, res) {

  let id = req.params.providerId

  try {
    res.send(await provider.getProviderById(id));
  }
  catch(err){
    console.log(err)
  }

}

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

  provider.changeProviderName(req.body.currentProviderName, req.body.newProviderName)
  .then(() => {
    res.send('Name has been changed')
  })
  .catch(err => console.log('An error occured', err))
  }


module.exports = {
  getProviderById,
  createNewProvider,
  changeProviderName
}