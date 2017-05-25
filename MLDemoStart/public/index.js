// Main App Logic
var app = new Vue({
	el: '#app',
	data: {
		input: {}
	},
	methods: {
		submitForm: function() {

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

}