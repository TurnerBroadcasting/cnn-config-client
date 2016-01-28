'use strict';

const util = require('util'), 
    fetch = require('node-fetch'),
    host = 'https://cnn-config-server-adslaton.c9users.io';
    
function testOptions (options) {
    return typeof options === 'undefined' || typeof options !== 'object' ? {} : options;
}

function register (options) {
    options = testOptions(options);
    
    let url = util.format('%s/%s', host, 'register');
    
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
    
    let url = util.format('%s/%s', host, 'update');
    
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
    
    let url = util.format('%s/%s/%s/%s', host, options.product, options.environment, options.token);
    
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