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

app.get('/providers', providers.getProviders)



app.listen(port, () => {
  console.log('Server listening at http://localhost:3000');
})