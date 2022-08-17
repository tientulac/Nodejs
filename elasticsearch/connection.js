const elasticsearch = require('elasticsearch');

const client = new elasticsearch.Client({  
  host: 'localhost:9200',
  log: 'trace',
  apiVersion: '7.2'
});

module.exports = client;  