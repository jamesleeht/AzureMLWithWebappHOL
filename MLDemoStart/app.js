// packages
const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser')

// express setup
const app = express();
const port = 3000;
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// routes
app.get('/', function (req, res) {
	res.send('Default route');
});

app.use('/ml', require('./ml'));

// start listening
app.listen(port, function () {
	console.log('Server listening on port 3000');
});