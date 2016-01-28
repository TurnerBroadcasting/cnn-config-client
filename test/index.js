'use strict';

const client = require('../index.js'),
    data = {
        product: 'test',
        environment: 'dev',
        token: '9b796e238d750e4947e93366a7f3ef96ce115ac0'
    };

client.getConfig(data);