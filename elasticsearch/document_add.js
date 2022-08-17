var client = require('./connection.js');

client.index({  
  index: 'gov',
  type: 'constituencies',
  id: '2',
  body: {
    name: "TienNN",
    age: "1234"
  }
},function(err,resp,status) {
    if (err) {
      console.log(err);
    }
    else {
      console.log(resp);
    }
});
