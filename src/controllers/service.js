const mongoose = require('mongoose');

const Service = mongoose.model('Service');

module.exports = {
  get(req, res, next){
    Service.find({}, 'title description partner price hours image')
      .then(data=>{
        res.status(200).send(data);
      })
      .catch(error=>{
        res.status(400).send(error);
      });
  },
  getBySlug(req, res, next){
    console.log(req.body.prompt);
    Service.find({
      $or:[
        {slug: {$regex: req.body.prompt, $options: 'gi'}},
        {title: {$regex: req.body.prompt, $options: 'gi'}}
      ]
    }, '-_id title slug description price partner hours image')
      .then(data=>{
        res.status(200).send(data);
      })
      .catch(error=>{
        res.status(400).send("No services found");
      });
  },
  getById(req, res, next){
    Service.findById(req.params.id)
      .then(data=>{
        res.status(200).send(data);
      })
      .catch(error=>{
        res.status(400).send(error);
      });
  },
  getPartnerHours(req, res, next){
    Service.find(
      {
        partner: {$regex: req.body.name, $options: 'gi'},
        hours: {$in: req.body.hours}
      }
    )
      .then(data=>{
        res.status(200).send(data);
      })
      .catch(error=>{
        res.status(400).send(error);
      });
  },
  create(req, res, next){
    Service.create(req.body)
      .then(data=>{
        res.status(201).send(data);
      })
      .catch(error=>{
        res.status(400).send(error.errors);
      })
  },
  update(req, res, next){
    Service.findByIdAndUpdate(req.params.id, req.body)
      .then(data=>{
        res.status(201).send(data);
      })
      .catch(error=>{
        res.status(400).send(error);
      });
  },
  delete(req, res, next){
    Service.findByIdAndDelete(req.params.id)
      .then(data=>{
        res.status(200).send(data);
      })
      .catch(error=>{
        res.status(400).send(error);
      })
  }
}