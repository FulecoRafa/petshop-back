const mongoose = require('mongoose');
const Pet = mongoose.model('Pet');

module.exports = {
  getByClient(req, res, next){
    console.log(req.user._id)
    Pet.find({client: req.user._id}, '_id -__v')
      .then(data=>{
        if(data.length < 1) return res.status(400).send("Could not find pets related to this client.");
        res.status(200).send(data);
      })
      .catch(error=>{
        res.status(400).send("Could not find pets related to this client.");
      });
  },
  getById(req, res, next){
    Pet.findById(req.params.id)
      .then(data=>{
        if(data == null) return res.status(400).send("Could not find pet.");
        res.status(200).send(data);
      })
      .catch(error=>{
        res.status(400).send("Could not find pet.");
      });
  },
  create(req, res, next){
    Pet.create(req.body)
      .then(data=>{
        res.status(201).send("Pet successfully logged!");
      })
      .catch(error=>{
        res.status(400).send(error);
      });
  },
  update(req, res, next){
    Pet.findByIdAndUpdate(req.params.id, req.body)
      .then(data=>{
        res.status(200).send("Successfully updated pet information!");
      })
      .catch(error=>{
        res.status(400).send("There was an error updating pet information.");
      });
  },
  delete(req, res, next){
    Pet.findByIdAndDelete(req.params.id)
      .then(data=>{
        res.status(200).send("Pet information succesfully deleted. We'll miss it...");
      })
      .catch(error=>{
        res.status(400).send("There was an error, can't delete pet information.");
      });
  }
}