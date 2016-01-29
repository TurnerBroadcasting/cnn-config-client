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

function getVariable (object, value) {
    let prop,
        name;
    
    if (typeof object === 'object') {
        getVariable(object, value);
    } else {
        for (prop in object) {
            if (object.hasOwnProperty(prop)) {
                getVariable(prop);
                if (name) {
                    name = util.format('%s_%s', name, prop.toUpperCase());
                } else {
                    name = util.format('%s', prop.toUpperCase());
                }
                process.env[name] = json[prop];
                console.log('setting %s to %s', prop, json[prop]);
            }
        }
    }
}

function setEnv (json) {
    let prop,
        value;

    getVariable(json, value);
    
    for (prop in json) {
        if (json.hasOwnProperty(prop)) {
            if (name) {
                name = util.format('%s_%s', name, prop.toUpperCase());
            } else {
                name = util.format('%s', prop.toUpperCase());
            }
            process.env[name] = json[prop];
            console.log('setting %s to %s', prop, json[prop]);
        }
    }
}

function register (options) {
    options = testOptions(options);

    let url = util.format('%s/%s', hosts[options.environment], 'register');

    fetch(url, {method: 'POST', body: options.data})
        .then(function (res) {
            return res.json();
        })
        .then(function (json) {
            setEnv(json);
        });
}

function update (options) {
    options = testOptions(options);

    let url = util.format('%s/%s', hosts[options.environment], 'update');

    fetch(url, {method: 'POST', body: options.data})
        .then(function (res) {
            return res.json();
        })
        .then(function (json) {
            setEnv(json);
        });
}

function getConfig (options) {
    options = testOptions(options);

    let url = util.format('%s/%s/%s/%s', hosts[options.environment], options.product, options.environment, options.token);

    fetch(url)
        .then(function (res) {
            return res.json();
        })
        .then(function (json) {
            setEnv(json);
        });
}

module.exports = {
    register: register,
    update: update,
    getConfig: getConfig
};
