'use strict';


var main = function() {

    var api_client = require('./api_client'),
        util = require('util'),
        clientOpts = {
            baseURL: 'http://jsonplaceholder.typicode.com/',
            timeout: 30000
        };

    api_client.createAPIPClient(clientOpts).request('/posts/1', api_client.HEAD)
        .then(function (data) {
            console.log('Received response headers: ' + util.inspect(data.headers));
            console.log('Received response body: ' + data.body);
        })
        .catch(function (error) {
            console.log('Request finished with error: ' + error);
        }
    );

};


if (require.main === module) {
    main();
}