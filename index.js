'use strict';

const util = require('util'), 
    fetch = require('node-fetch'),
    hosts = {
        dev: 'http://cnn-config-server.dev.services.ec2.dmtio.net:5000',
        prod: 'http://cnn-config-server.prod.services.ec2.dmtio.net:5000'
    };
    
function testOptions (options) {
    return typeof options === 'undefined' || typeof options !== 'object' ? {} : options;
}

function register (options) {
    options = testOptions(options);
    
    let url = util.format('%s/%s', hosts[options.environment], 'register');
    
    fetch(url, {method: 'POST', body: options.data})
        .then(function (res) {
            return res.json();
        })
        .then(function (json) {
            console.log(json);
        })
}

function update (options) {
    options = testOptions(options);
    
    let url = util.format('%s/%s', hosts[options.environment], 'update');
    
    fetch(url, {method: 'POST', body: options.data})
        .then(function (res) {
            return res.json();
        })
        .then(function (json) {
            console.log(json);
        })
}

function getConfig (options) {
    options = testOptions(options);
    
    console.log('%s/%s/%s/%s', hosts[options.environment], options.product, options.environment, options.token);
    
    let url = util.format('%s/%s/%s/%s', hosts[options.environment], options.product, options.environment, options.token);
    
    console.log(url);
    
    fetch(url)
        .then(function (res) {
            return res.json();
        })
        .then(function (json) {
            console.log(json);
        })
}

module.exports = {
    register: register,
    update: update,
    getConfig: getConfig
}