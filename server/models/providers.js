const db = require('../database/index.js')
const { Provider } = require('../database/dbModels.js')


// Create new Provider (this will take an object with a name: String, client: array of Client ids as Strings)

const createNewProvider = async function (provider) {

  Provider.create({
    name: provider.name
  })
  .then(doc => {
    console.log(`${provider.name} was successfully saved to the database`);
  })
  .catch(err => console.log(`${provider.name} was NOT successfully saved to the database`, err))

}

  //issue: when the currentProviderName is not not correct, no document is found, but I still get the message back. Error handleing is incorrect. This may not be used in the app anyway

  const changeProviderName = async function (currentProviderName, newProviderName) {

    Provider.findOneAndUpdate({name: currentProviderName}, {name: newProviderName}, {
      new: true,
      lean: true
    })
    .then(doc => {
      console.log(`Provider name changed from ${currentProviderName} to ${newProviderName}`);
      return doc
    })
    .catch(err => console.log('Could not change name', err))

    }

  const deleteProvider = async function(providerId) {
    Provider.deleteOne({_id: providerId})
    .then(doc => console.log(`Provider ${providerId} was removed`))
    .catch(err => console.log(err))
  }


module.exports = {
  createNewProvider,
  changeProviderName,
  deleteProvider
}