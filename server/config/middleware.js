const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

module.exports = function(app) {
	app.use(express.static(path.join(__dirname,'/../../client/dist')))
	app.use(bodyParser.json())

};