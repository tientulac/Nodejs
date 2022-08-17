const client = require('./connection');

client.count({index: 'gov',type: 'constituencies'},function(err,resp,status) {  
  console.log("constituencies",resp);
});
