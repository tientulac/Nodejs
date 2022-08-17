const app = require('../app');
const user = require('../routes/user');
const email = require('../routes/email');

app.use('/api/hanttech/account', user);
app.use('/api/email', email);