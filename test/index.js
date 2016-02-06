'use strict';

const client = require('../index.js'),
    config = {
        product: 'test',
        environment: 'test',
        token: '35e6c81b5a764404eac05f0c556d7cb3f4549c00'
    };

config.data = {
    timeout: 9  
};

client.update(config);

client.getConfig(config);