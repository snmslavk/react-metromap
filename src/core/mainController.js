export default class mainController {
    static Hello() {
        console.log('hello');
    
const https = require('https');
 
https.get('/api/stations.json', (resp) => {
  let data = '';
 
  // A chunk of data has been recieved.
  resp.on('data', (chunk) => {
    data += chunk;
  });
 
  // The whole response has been received. Print out the result.
  resp.on('end', () => {
      let parsedData = JSON.parse(data);
    //console.log(parsedData);
    return parsedData;
  });
 
}).on("error", (err) => {
  console.log("Error: " + err.message);
});
    }

    MyFunc() {
        console.log('myyyy');
    }

    static getStations(url) {
        // return new pending promise
        return new Promise((resolve, reject) => {
          // select http or https module, depending on reqested url
          const lib = url.startsWith('https') ? require('https') : require('http');
          const request = lib.get(url, (response) => {
            // handle http errors
            if (response.statusCode < 200 || response.statusCode > 299) {
               reject(new Error('Failed to load page, status code: ' + response.statusCode));
             }
            // temporary data holder
            const body = [];
            // on every content chunk, push it to the data array
            response.on('data', (chunk) => body.push(chunk));
            // we are done, resolve promise with those joined chunks
            response.on('end', () => resolve(body.join('')));
          });
          // handle connection errors of the request
          request.on('error', (err) => reject(err))
          })
      };
}