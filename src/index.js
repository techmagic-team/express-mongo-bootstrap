process.env.VCAP_APP_PORT = 3333;
//process.env.SECURE_EXPRESS = false;

var express = require('express'),
    app     = express(),
    api     = require('./api/api');

// Bootstrap application settings
require('./config/express')(app);

app.use('/v1', api);

// error-handler settings
require('./config/error-handler')(app);

var port = process.env.VCAP_APP_PORT || 3000;
app.listen(port);
console.log('listening at:', port);