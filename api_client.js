/**
 * This module provides wrapper over `request` module to build simple Web API clients.
 *
 * Here's the typical usage example:
 *
 *    var api_client = require('api_client'),
 *        clientOpts = {baseURL: 'http://jsonplaceholder.typicode.com/',
 *                      timeout: 30000};
 *
 *    api_client.createAPIPClient(clientOpts).request('/posts/1')
 *        .then(function (data) {
 *            console.log('Received response: ' + data.body);
 *        })
 *        .catch(function (error) {
 *            console.log('Request finished with error: ' + error);
 *        });
 *
 * @module
 * @name api_client
 * @author Vovan Kuznetsov <vovanec@gmail.com>
 * @copyright Vovan Kuznetsov, 2015 year.

 */

'use strict';

var RSVP = require('rsvp'),
    request = require('request'),
    _ = require('underscore'),
    _request = RSVP.denodeify(request);


const TRAILING_SLASH = /\/*$/;


/**
 * Factory function to create Web API client.
 *
 * @param {Object} clientOptions - Client options object. `baseURL` property is required,
 * the rest are optional and compatible with `request` module.
 */
exports.createAPIPClient = function(clientOptions) {

    if (clientOptions.hasOwnProperty('baseURL') && !_.isUndefined(clientOptions.baseURL)) {
        var baseURL = clientOptions.baseURL.replace(TRAILING_SLASH, '');
        delete clientOptions.baseURL;
    } else {
        throw new Error('There is no required `baseURL` property in client clientOptions.');
    }

    function _makeRequestOptions(requestOptions) {
        let mergedOptions = {};

        for (var clientOption in clientOptions) {
            if (clientOptions.hasOwnProperty(clientOption)) {
                mergedOptions[clientOption] = clientOptions[clientOption];
            }
        }

        mergedOptions.url = baseURL + requestOptions.uri;
        mergedOptions.method = requestOptions.method || 'GET';
        mergedOptions.headers = requestOptions.headers;
        mergedOptions.body = requestOptions.body;

        return mergedOptions;
    }

    return {
        /**
         * Perform HTTP request to the API server.
         *
         * @param {String} uri - The API method URI.
         * @param {String} [method] - HTTP method, defaults to GET.
         * @param {Object} [headers] - Request headers.
         * @param {String} [body] - Request body.
         *
         * @returns Promise for the response object.
         */
        request: function (uri, method, headers, body) {

            let opts = {uri: uri,
                method: method,
                headers: headers,
                body:body};

            return _request(_makeRequestOptions(opts));
        }
    };
};
