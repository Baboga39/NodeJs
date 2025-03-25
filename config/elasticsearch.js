const { Client } = require('@elastic/elasticsearch');
const dotenv = require('dotenv');

dotenv.config();

const elasticClient = new Client({
  node: process.env.ELASTICSEARCH_URL,
  auth: {
    username: 'elastic',
    password: '5tWcMs1ddDD39Hn7os5DhQD9',
  },
});

module.exports = elasticClient;
