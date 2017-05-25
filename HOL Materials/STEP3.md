# 3. Make a webapp that communicates with Azure ML

## Introduction

In this tutorial, we'll make a simple webapp using NodeJS and VueJS. This webapp will take in important data about a car and use the model we made to predict its price.

## Prerequisites

Install these:

1. [NodeJS](https://nodejs.org/en/download/)
2. A text editor of your choice, I use [VSCode](https://code.visualstudio.com/download)

Download the starting project:

1. [Starting project](https://github.com/jamesleeht/AzureMLWithWebappHOL/tree/master/MLDemoStart)


## Project Structure

We will be building a webapp using NodeJS for the backend and VueJS for the frontend.

The NodeJS files consist of:

1. app.js
  - Setup express to handle routes and serve the VueJS files

2. ml.js  
  - Consists of the /ml route which will be used to send data to your Azure Machine Learning web service and expose the result to your VueJS layer

The VueJS files consist of:

1. public folder
  - Contains the index html/css/js which will be the frontpage of the webapp

## Project setup

Open your command prompt and cd into the project folder you downloaded. For example:

```
cd Desktop/MLDemoStart
```

Run this command to install all package dependencies:

```
npm install
```

You can use this command to run the server when you want to test your code:

```
npm start
```

## Making the backend

Let's start by making our NodeJS backend communicate with Azure ML.

Open `ml.js` in your text editor. In this file, you'll see this code:

```js 
router.post('/', (req, res) => {

});
```

This route will be called every time we make a HTTP post request to `/ml` on the server. We defined this in the `app.js` file:

```js
app.use('/ml', require('./ml'));
```

Let's now make some code in this route to send a request to the ML web service and get a response.

For this, we will be using the [request npm](https://www.npmjs.com/package/request) to simplify things. This has already been required at the top of the file.

Let's start by declaring our web service URL and API key that you got in Step 2. 

```js
// Use your own web service URL and API key here
// These are my web service credentials (in case you missed step 1 & 2)
var webServiceUrl = "https://asiasoutheast.services.azureml.net/subscriptions/b4104c05068b4f139ed5eabce2ab0618/services/307b82edcd7346fcab6308352045203a/execute?api-version=2.0&format=swagger";
var apiKey = "7OrneZV5wlMvWGxJWcONIa3ZgtcaGP1yaU2rn24pSRNhJtlKz922Bm7bcerV0M6iln4ebG9lac/U7D+47LcAyw==";
```

Next, let's make a data object which fits the API definition provided by the Azure ML web service.

The `req.body` property will automatically contain variables parsed from a JSON request sent to this route.
(This is done using the body-parser JSON middleware which is defined in `app.js`)

Let's place the variables from the HTTP request into our data object.

```js
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
```

Next, let's prepare/format the request we want to send to the ML web service.

This will be a POST request, with the authorization header containing the API key. We will also send the data object we constructed as a JSON string.

```js
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
```

Once we've formatted the request, let's send the request and wait for a response using the callback method.

Once we've received the response from the ML web service, we'll send the prediction result (contained in the response body) back to the client. In this case, the client will be our frontend JS layer.

```js
request(options, (error, response, body) => {
	res.send(body);
});
```

We're done! Let's review what we've just setup:

1. A client (in this case, our frontend JS) makes a POST request with a JSON string containing data about the car.

2. The server parses the JSON string and formats a new data object which fits the Azure ML Web Service definition. It then sends another request with this new JSON string to Azure ML and gets a response containing the prediction result.

3. The server sends the response back to the client.

## Making the frontend

Now that we've setup our backend to talk to Azure ML, we can interact with it using our VueJS layer. The frontend files are contained in the `public` folder.

### Pre-defined data bindings/directives

In our index.html, we have a simple form page which is binded to properties and methods in index.js (using VueJS directives). You can see a list of them below:

#### Form Fields

All the form fields are binded to the input object using the `v-model` directive in the HTML tags.

index.html:

```html
<!-- Examples -->
<input v-model="input.engine_size" type="number">
<input v-model="input.peak_rpm" type="number">
```

index.js:

```js
data: {
	input: {}
}
```

#### Form Button 

The button is also binded to a method using the `v-on:click` directive.

index.html:

```html
<button v-on:click="submitForm" type="button">Get Prediction</button>
```

index.js:

```js
methods: {
	submitForm: function() {
	}
}
```

### Putting it together

We can use the bindings to achieve this inside `index.js`:

1. When the `Form Button` is clicked, we call a method
2. The method can take data from the `Form Fields`
3. The method sends the data to the backend (the route defined in `ml.js`)
4. We get a result and then display it on the page

First, we need some way to display the prediction result to the user. We can do this by simply binding a variable to be displayed on our HTML.

index.html:

```html
<!-- Make sure this is placed in the #app div! -->
<h2>Price Result:</h2>
<h3>{{ output }}</h3>
```

index.js:

```
data: {
	input: {},
	output: "No results, get a prediction first"
}
```

Next, lets define a new method which sends a request to our backend: (read the comments for more details)

```js
// Function to send data to ML
function sendRequest(){
	// Format request
	var http = new XMLHttpRequest();

	// create json string from form input data
	var body = JSON.stringify(app.input); 

	// listen for change on http request
	http.onreadystatechange = function() {
		// if we get a valid response and no errors
		if(http.readyState == 4 && http.status == 200) {
			// parse the response
			var response = JSON.parse(http.responseText);

			// set the output variable (automatically displayed on page cause of data binding)
			app.output = response.Results.output1[0]["Scored Labels"];
		}
	}

	// send POST request to our backend route
	http.open("POST", "/ml", true);
	http.setRequestHeader("Content-Type", 'application/json');
	http.send(body);
}
```

Next, we have to call our `sendRequest()` method when the button is clicked.

We should also call the pre-defined `validateForm()` method before sending the request.

```js
methods: {
	submitForm: function() {
		if(validateForm()) {
			sendRequest();
		} else {
			alert("Please fill in all fields");
		}
	}
}
```

All set! Now our frontend VueJS is able to send form input data to our backend NodeJS and display a prediction result.

## End

Try out your webapp! It should return a price prediction and show it to the user.

Run `npm start` on your cmd and go to `localhost:3000` on your browser to try it out.