// Imports
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// DB Collections
const Client = mongoose.model('Client');
const RK = mongoose.model('RefreshKey')

// Config
const expirationTime = '30m';

// Functions
module.exports = {
  // Put before actual login to create tokens
  createTokens(req, res, next){
    if(req.user == null) res.status(401).send("Please inform user information for login");
    req.jwkeysAuth = jwt.sign(req.user, process.env.JSON_SHUSH, {expiresIn: expirationTime});
    req.jwkeysRefresh = jwt.sign(req.user, process.env.JSON_REFRESH_SHUSH);
    next();
  },
  // Refreshes token
  refreshToken(refreshKey){
    jwt.verify(refreshKey, process.env.JSON_REFRESH_SHUSH)
      .then(data=>{
        delete data.expiresIn;
        return jwt.sign(data, process.env.JSON_SHUSH, {expiresIn: expirationTime});
      })
      .cacth(()=>{
        return false;
      });
  },
  // Verifies auth token and autorefreshes token if expired
  authToken(req, res, next){
    const authToken = req.headers['auth'];
    if(authToken == null) return res.status(401).send("No auth token, please login.");

    jwt.verify(authToken, process.env.JSON_SHUSH, async (error, decoded)=>{
      if(error){
        await RK.find({key: req.headers['refresh']})
          .then(data=>{
            if(data.length < 1) return res.status(403).send("Not authorized, please login");
            let newKey = "";
            jwt.verify(req.headers['refresh'], process.env.JSON_REFRESH_SHUSH, (error, decoded)=>{
              if(error) return false
              else{
                delete decoded.iat;
                newKey = jwt.sign(decoded, process.env.JSON_SHUSH, {expiresIn: expirationTime});
              }
            });
            if(newKey != ""){
              res.status(200).send({newAuthKey: newKey});
            }else{
              return res.status(403).send("Not authorized, please login");
            }
          })
          .catch(error=>{
            return res.status(403).send("Not authorized, please login");
          });
      }else{
        req.user = decoded;
        next();
      }
    });
  },
  // Checks password
  auth(req, res, next){
    Client.findOne({name: req.body.name})
      .then(user=>{
        bcrypt.compare(req.body.passwd, user.passwd, function(err, response) {
          if (err) res.status(500).send("There was an internal error in the server");
          if (res){
            req.user = user.toObject();
            next();
          }else return res.status(403).send("Incorrect password.");
        });
      })
      .catch(()=>{
        res.status(400).send("User not found.");
      });
  },
  // Encrypts password
  async encrypt(req, res, next){
    req.body.passwd =  await bcrypt.hash(req.body.passwd, 10);
    return next();
  },
  // Check for admin priviledges
  adminShield(req, res, next){
    if(req.user.permission === 'admin') next();
    else res.status(403).send("Permission denied");
  }
}