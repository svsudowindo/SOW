var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();
var cors = require('cors');

var authRoutes = require('./routes/auth-routes');

var adminRoutes = require('./routes/admin-routes');

var APP_CONFIG = require('./common/config/app.config');

var User = require('./controllers/auth/user/user.model');
var Utils = require('./common/services/utils');
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({limit: '50mb'}));

app.use('/auth', authRoutes.authRoutes);
app.use('/admin', function(req, res, next) {
    const authToken = req.get('Authorization');
    console.log(authToken);
    User.find({authToken: authToken}, (userError, userResult) => {
        if (userError) {
              return res.send(Utils.sendResponse(500, null, ['Unable to  fetch User. Please try again'], 'Unable to fetch user. Please try again'));
          }
          if (userResult.length <= 0) {
            return res.send(Utils.sendResponse(401, null, ['Unauthorized User'], 'Unauthorized User. Please try again'));
        }
        next();
    })
}, adminRoutes.adminRoutes);

mongoose.connect('mongodb://localhost:27017/sow', { useNewUrlParser: true, useUnifiedTopology: true }).then(res => {
  app.listen(APP_CONFIG.PORT, () => {
    console.log('listening', APP_CONFIG.PORT);
  })
})
