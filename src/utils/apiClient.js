// crudOperation utility function for making CRUD (Create, Read, Update, Delete) API request
const crudOperation = async (method, endpoint, data = null) => {
  const baseUrl = "https://chill-gamer-server-side-gamma.vercel.app/"; // Base URL for the API
  const url = `${baseUrl}${endpoint}`; // Construct the full URL using the base URL and endpoint

  // Define for header for the request
  const headers = {
    "content-type": "application/json", // Set content type to JSON
  };
  // Define the request configuration
  const config = {
    method, // HTTP method (e.g., GET, POST, PUT, DELETE)
    headers, // Include headers in the request
  };

  // zif the method is POST, PUT or PATCH, includes the request body
  if (data && ["POST", "PUT", "PATCH"].includes(method)) {
    config.body = JSON.stringify(data); // Convert data to json and add it to the request body
  }

  try {
    // Make the API request using fetch
    const response = await fetch(url, config);

    // Check if the request is not ok (e.g., 4xx or 5xx status code)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`); // Throw an error with the status code
    }

    // Parse and return the JSON response
    return await response.json();
  } catch (error) {
    // Log the error to the console
    console.error("Error in crudOperation:", error);
    // Re throw the error to allow calling function to handle it
    throw error;
  }
};

export default crudOperation; // export the crudOperation function
