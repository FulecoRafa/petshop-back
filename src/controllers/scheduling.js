const mongoose = require('mongoose');
const Scheduling = mongoose.model('Scheduling');

module.exports = {
  getByTimes(req, res, next){
    Scheduling.find({date: {$gte: req.body.from, $lte: req.body.to}})
    .populate('client', 'name image -_id')
    .populate('service', 'name partner image -_id')
    .populate('pet', 'name image -_id')
      .then(data=>{
        res.status(200).send(data);
      })
      .catch(error=>{
        res.status(400).send("Date formats are incorrect");
      });
  },
  getById(req, res, next){
    Scheduling.findById(req.params.id)
    .populate('client', 'name image')
    .populate('service', 'name partner image')
    .populate('pet', 'name image -_id')
      .then(data=>{
        res.status(200).send(data);
      })
      .catch(error=>{
        res.status(400).send("Couldn't find this apointment.");
      });
  },
  create(req, res, next){
    Scheduling.create(req.body)
      .then(data=>{
        res.status(201).send("Succesfully scheduled your appointment");
      })
      .catch(error=>{
        res.status(400).send(error);
      })
  },

}