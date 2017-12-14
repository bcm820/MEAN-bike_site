const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');

module.exports = function(app) {

	app.use(express.static(path.join(__dirname,'/../../client/dist')))
	app.use(bodyParser.json())

	app.use(session({
		secret: 'thisIsASecret',
		resave: false,
		saveUninitialized: true
	}));

};