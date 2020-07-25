const mongoose = require('mongoose');
const Client = mongoose.model('Client');
const RK = mongoose.model('RefreshKey');

module.exports = {
  get(req, res, next){
    Client.find()
      .then(data=>{
        res.status(200).send(data);
      })
      .catch(err=>{
        res.status(400).send("No users found");
      });
  },
  search(req, res, next){
    Client.find({
      $or:[
        {name: {$regex: req .body.prompt, $options: 'gi'}}
      ]
    })
      .then(data=>{
        res.status(200).send(data);
      })
      .catch(err=>{
        res.satus(400).send("No users found");
      });
  },
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
    delete req.user.passwd;
    delete req.user.__v;
    delete req.user.iat;
    delete req.user.exp;
    res.status(200).send(req.user);
  },
  authAdmin(req, res, next){
    delete req.user.passwd;
    delete req.user.__v;
    delete req.user.iat;
    delete req.user.exp;
    res.status(200).send(req.user);
  },
  login(req, res, next){
    RK.create({key: req.jwkeysRefresh});
    return res.status(200).send({auth: req.jwkeysAuth, refresh: req.jwkeysRefresh, permission: req.user.permission});
  },
  create(req, res, next){
    Client.create(req.body)
      .then(data=>{
        res.status(201).send(data);
      })
      .catch(error=>{
        if(error.errors)
          res.status(400).send("Couldn't create user, please check provided information");
        else
          res.status(400).send("Username already exists")
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