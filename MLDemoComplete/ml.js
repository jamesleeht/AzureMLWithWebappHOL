// npm
var express = require('express');
var request = require('request');

// routes
var router = express.Router();
router.post('/', (req, res) => {
	// web service details
	var webServiceUrl = "https://asiasoutheast.services.azureml.net/subscriptions/b4104c05068b4f139ed5eabce2ab0618/services/307b82edcd7346fcab6308352045203a/execute?api-version=2.0&format=swagger";
	var apiKey = "7OrneZV5wlMvWGxJWcONIa3ZgtcaGP1yaU2rn24pSRNhJtlKz922Bm7bcerV0M6iln4ebG9lac/U7D+47LcAyw==";

	// data
	var data = {
		"Inputs":{
			"input1":[
				{
					'make': req.body.make,   
					'body-style': req.body.body_style,
					'wheel-base': req.body.wheel_base,
					'engine-size': req.body.engine_size,   
					'horsepower': req.body.horsepower,   
					'peak-rpm': req.body.peak_rpm,
					'highway-mpg': req.body.highway_mpg
				}
			]
		},
		"GlobalParameters":{}
	}

	// request
	var options = {
		method: 'POST',
		uri: webServiceUrl,
		headers: {
			'Content-Type': 'application/json',
			'Authorization': 'Bearer ' + apiKey
		},
		body: JSON.stringify(data)
	}

	request(options, (error, response, body) => {
		res.send(body);
	});

});

module.exports = router;