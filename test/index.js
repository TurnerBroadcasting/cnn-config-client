'use strict';

const client = require('../index.js'),
    config = {
        product: 'test',
        environment: 'test',
        token: 'c937944cf0422dda0ae939746d5b60e7c779b2d9'
    };

config.data = {
    timeout: 9  
};

client.update(config);

client.getConfig(config);