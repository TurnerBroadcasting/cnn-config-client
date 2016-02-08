'use strict';

const util = require('util'),
    fetch = require('node-fetch'),
    host = process.env.CONFIG_HOST;

function testOptions (options) {
    return typeof options === 'undefined' || typeof options !== 'object' ? {} : options;
}

/**
 * @desc Sets the environment variables for the host
 * @param {object} json - The json representation of the set environment variables
 */ 
function setEnv (json) {
    let prop,
        name;

    console.log(json);
    if (!json || (json.STATUSCODE && json.STATUSCODE === '500')) {
        console.log('ENV NOT SET ERROR: %j', json);
    } else {
        for (prop in json) {
            if (json.hasOwnProperty(prop)) {
                name = prop.toUpperCase();
                process.env[name] = json[prop];
                console.log('set process.env.%s = %s', name, json[prop]);
            }
        }
    }
}

/**
 * @desc Posts an application registration information. Options required to be 
 * passed are `environment` and `data`
 * 
 * @param {object} options - A set of required options
 */
function register (options) {
    options = testOptions(options);

    let url = util.format('%s/%s', host, 'register'),
        data = JSON.stringify(options);

    fetch(url, {method: 'POST', body: data})
        .then(function (res) {
            return res.json();
        })
        .then(function (json) {
            console.log('REGISTER RESPONSE: %j', json);
            setEnv(json);
        });
}

/**
 * @desc Posts an application update information. Options required to be passed
 * are `environment` and `data`
 * 
 * @param {object} options - A set of required options
 */
function update (options) {
    options = testOptions(options);

    let url = util.format('%s/%s', host, 'update'),
        data = JSON.stringify(options);

    fetch(url, {method: 'POST', body: data})
        .then(function (res) {
            return res.json();
        })
        .then(function (json) {
            console.log('UPDATE RESPONSE: %j', json);
        });
}

/**
 * @desc Gets an application config information. Options required to be passed
 * are `environment`, `data`, `product`, and `token`
 * 
 * @param {object} options - A set of required options
 */
function getConfig (options) {
    options = testOptions(options);

    let url = util.format('%s/%s/%s/%s', host, options.product, options.environment, options.token);
    console.log(url);
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
