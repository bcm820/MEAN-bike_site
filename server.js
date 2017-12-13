
'use strict';

// express
const express = require('express');
const app = express();

// require configs
require('./server/config/middleware')(app);
require('./server/config/mongoose');

// specify routers and routes
const router = express.Router();
require('./server/routes/authRoutes.js')(router);
require('./server/routes/bikesRoutes.js')(router); // create auth layer

// connect routes
app.use('/api/auth', router)
app.use('/api/bikes', router)
app.use('/api/bikes/filter', router)

// redirect all URL errors to Angular index
const path = require('path');
app.all("*", (req, res) => { res.sendFile(path.resolve("./client/dist/index.html")) });

// launch server
app.listen(8000);
