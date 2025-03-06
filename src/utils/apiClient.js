const crudOperation = async (method, endpoint, data = null) => {
    const baseUrl =  "http://localhost:5000";
    const url = `${baseUrl}${endpoint}`;
    const headers = {
        "content-type": "application/json"
    };
    const config = {
        method, headers
    }
    if(data && ["POST", "PUT", "PATCH"].includes(method)){
        config.body = JSON.stringify(data);
    }
    try {
        const response = await fetch(url, config);

        if(!response.ok){
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error in crudOperation:", error);
        throw error;
    }
}

export default crudOperation;