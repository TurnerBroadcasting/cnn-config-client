'use strict';

const util = require('util'),
    fetch = require('node-fetch'),
    host = process.env.CONFIG_HOST,
    log = console;

function testOptions(options) {
    return typeof options === 'undefined' || typeof options !== 'object' ? {} : options;
}

/**
 * @desc Sets the environment variables for the host
 * @param {object} json - The json representation of the set environment variables
 * @param {function} callback - The function to run after the environment has been set
 */
function setEnv(json, callback) {
    let prop,
        name;

    if (!json || (json.STATUSCODE && json.STATUSCODE === '500')) {
        log.debug('ENV NOT SET ERROR: %j', json);
        if (typeof callback === 'function') {
            callback(json);
        } else {
            log.debug('No callback specified when setting the environment!');
        }
    } else {
        for (prop in json) {
            if (json.hasOwnProperty(prop)) {
                name = prop.toUpperCase();
                process.env[name] = json[prop];
                log.debug('set process.env.%s = %s', name, json[prop]);
            }
        }
        if (typeof callback === 'function') {
            callback(json);
        } else {
            log.debug('No callback specified when setting the environment!');
        }
    }
}

/**
 * @desc Posts an application registration information. Options required to be
 * passed are `environment` and `data`
 *
 * @param {object} options - A set of required options
 */
function register(options) {
    options = testOptions(options);

    let url = util.format('%s/%s', host, 'register'),
        data = JSON.stringify(options);

    fetch(url, {method: 'POST', body: data})
        .then(function (res) {
            return res.json();
        })
        .then(function (json) {
            log.debug('REGISTER RESPONSE: %j', json);
        });
}

/**
 * @desc Posts an application update information. Options required to be passed
 * are `environment` and `data`
 *
 * @param {object} options - A set of required options
 */
function update(options) {
    options = testOptions(options);

    let url = util.format('%s/%s', host, 'update'),
        data = JSON.stringify(options);

    fetch(url, {method: 'POST', body: data})
        .then(function (res) {
            return res.json();
        })
        .then(function (json) {
            log.debug('UPDATE RESPONSE: %j', json);
        });
}

/**
 * @desc Gets an application config information. Options required to be passed
 * are `environment`, `data`, `product`, and `token`
 *
 * @param {object} options - A set of required options
 * @param {function} callback - The function to run after the environment has been set
 */
function getConfig(options, callback) {
    options = testOptions(options);

    let url = util.format('%s/%s/%s/%s', host, options.product, options.environment, options.token);

    fetch(url)
        .then(function (res) {
            return res.json();
        })
        .then(function (json) {
            setEnv(json, callback);
        });
}

module.exports = {
    register: register,
    update: update,
    getConfig: getConfig
};
