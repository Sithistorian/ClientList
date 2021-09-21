const express = require('express');
const app = express();
const port = 3000;
const db = require('./database');
const { clients, providers } = require('./controllers/index.js');

// MiddleWare
app.use(express.json());

// Server the public folder
app.use(express.static('./public'));

//ROUTES

// Routes for Providers
app.get('/providers', providers.getAllProviders)
app.get('/providers/id/:providerId', providers.getProviderById)
app.get('/providers/name/:providerName', providers.getProviderByName)
app.post('/providers', providers.createNewProvider)
app.post('/providers/changeName', providers.changeProviderName) //This route requires an object {currentProviderName: 'name', newProviderName: 'name'} in the request

// Routes for Clients
app.get('/clients', clients.getAllClients)
app.get('/clients/id/:clientId', clients.getClientById)
app.get('/clients/email/:clientEmail', clients.getClientByEmail)
app.post('/clients', clients.createClient)
app.post('/clients/addProviderById', clients.addProviderToClientUsingId) //This route requires an object (clientID: id, providerId: id2)
app.post('/clients/addProviderByEmail', clients.addProviderToClientUsingEmail) //This route requires an object (clientEmail: name, providerId: id)
app.post('/clients/addMultipleProviders', clients.addMultipleProvidersToClient)
app.put('/clients/removeProvider', clients.removeProviderFromClient)
app.put('/clients/removeMultipleProviders', clients.removeMultipleProvidersFromClient)
app.post('/clients/deleteClient', clients.deleteClient)




app.listen(port, () => {
  console.log('Server listening at http://localhost:3000');
})