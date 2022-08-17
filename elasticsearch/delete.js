var client = require('./connection');

client.indices.delete({index: 'user'},function(err,resp,status) {  
  console.log("delete",resp);
});