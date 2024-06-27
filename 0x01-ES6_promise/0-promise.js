function getResponseFromAPI() {
  return new Promise((resolve, reject) => {
    // Simulate an asynchronous operation (e.g., API call)
    setTimeout(() => {
      resolve('API response');
    }, 1000); // You can adjust the delay as needed
  });
}

export default getResponseFromAPI;
