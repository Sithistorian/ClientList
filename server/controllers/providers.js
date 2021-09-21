const {client, provider } = require('../models/index.js'); // These are the models


const getProviderById = async function (req, res) {

  let id = req.params.providerId

  let responseData = await provider.getProviderById(id);

  res.send(responseData);
}

const createNewProvider = async function (req, res) {

  provider.createNewProvider(req.body)
  .then(() => {
    console.log(`The provider ${req.body.name} was created`);
    res.send(`The provider ${req.body.name} was created`)
  })
  .catch(err => console.log('Something went wrong', err))

}


module.exports = {
  getProviderById,
  createNewProvider,
}