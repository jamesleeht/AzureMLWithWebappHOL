// Main App Logic
var app = new Vue({
	el: '#app',
	data: {
		input: {},
		output: "No results, get a prediction first"
	},
	methods: {
		submitForm: function() {
			if(validateForm()) {
				sendRequest();
			} else {
				alert("Please fill in all fields");
			}
		}
	}
});

// Function to validate form
function validateForm(){
	var input = app.input;
	if(input.make && input.body_style && input.wheel_base && input.engine_size && input.horsepower && input.peak_rpm && input.highway_mpg){
		return true;
	} else {
		return false;
	}
}

// Function to send data to ML
function sendRequest(){
	// Format request
	var http = new XMLHttpRequest();
	var body = JSON.stringify(app.input);

	http.onreadystatechange = function() {
		if(http.readyState == 4 && http.status == 200) {
			var response = JSON.parse(http.responseText);
			app.output = response.Results.output1[0]["Scored Labels"];
		}
	}
	http.open("POST", "/ml", true);
	http.setRequestHeader("Content-Type", 'application/json');
	http.send(body);
}