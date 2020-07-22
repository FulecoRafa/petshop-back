const mongoose = require('mongoose');
const Client = mongoose.model('Client');
const RK = mongoose.model('RefreshKey');

module.exports = {
  getById(req, res, next){
    Client.findById(req.params.id)
      .then(data=>{
        res.status(200).send(data);
      })
      .catch(error=>{
        res.status(400).send("Could not find client");
      });
  },
  auth(req, res, next){
    res.status(200).send("Permission granted");
  },
  authAdmin(req, res, next){
    res.status(200).send("Permission granted");
  },
  login(req, res, next){
    RK.create({key: req.jwkeysRefresh});
    return res.status(200).send({auth: req.jwkeysAuth, refresh: req.jwkeysRefresh});
  },
  create(req, res, next){
    Client.create(req.body)
      .then(data=>{
        res.status(201).send(data);
      })
      .catch(error=>{
        res.status(400).send("Couldn't create client");
      });
  },
  update(req, res, next){
    Client.findByIdAndUpdate(req.params.id, req.body)
      .then(data=>{
        res.status(200).send("User info updated succesfully");
      })
      .catch(error=>{
        res.status(400).send(error);
      });
  },
  logout(req, res, next){
    RK.findOneAndDelete({key: req.body.key})
      .then(data=>{
        if(data == null){
          return res.status(400).send("Loggin not found.");
        }
        res.status(203).send("Logged out.");
      })
      .catch(error=>{
        console.log(error);
        res.status(400).send(error);
      });
  }
}