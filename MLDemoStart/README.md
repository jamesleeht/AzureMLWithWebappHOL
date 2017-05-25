# Starting Point for HOL

## Project Structure

- Public folder
	- Uses Vue.js
  - Contains frontend files (HTML, CSS, JS) which are served to the user

- app.js
  - Uses Node.js
	- Uses express npm
	- Entry point for the webapp
	- Contains basic setup of server
	  - Setup express server and routes (to ml.js)
	  - Set static folder (public)
	  - Enable CORS
	  - Use bodyparser json middleware

- ml.js
  - Contains the /ml route which will send input data to the Azure Machine Learning web service and return the result as a response