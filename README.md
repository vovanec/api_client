Wrapper over `request` module to build simple Web API clients.

Example:

```javascript
(function () {

    var api_client = require('./api_client'),
        clientOpts = {
            baseURL: 'http://jsonplaceholder.typicode.com/',
            timeout: 30000
        };

    api_client.createAPIPClient(clientOpts).request('/posts/1')
        .then(function (data) {
            console.log('Received response: ' + data.body);
        })
        .catch(function (error) {
            console.log('Request finished with error: ' + error);
        }
    );

}());

```


