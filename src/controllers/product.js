const mongoose = require('mongoose');
const Product = mongoose.model('Product');

module.exports = {
  get(req, res, next){
    Product.find({active: true}, 'title description price')
      .then(data=>{
        res.status(200).send(data);
      })
      .catch(error=>{
        res.status(400).send(error);
      });
  },
  getBySlug(req, res, next){
    Product.findOne({
    $or:[
      {slug: {$regex: req.body.slug, $options: 'gi'}},
      {tags: {$regex: req.body.tag, $options: 'gi'}}
    ],
    active: true
  },
    'title slug description price tags')
      .then(data=>{
        if(data.length < 1) return res.status(400).send("No item found");
        res.status(200).send(data);
      })
      .catch(error=>{
        res.status(400).send(error);
      });
  },
  getById(req, res, next){
    Product.findById(req.params.id)
      .then(data=>{
        res.status(200).send(data);
      })
      .catch(error=>{
        res.status(400).send(error);
      });
  },
  create(req, res, next){
    Product.create(req.body)
      .then(data=>{
        res.status(201).send(data);
      })
      .catch(error=>{
        res.status(400).send(error.errors);
      })
  },
  update(req, res, next){
    Product.findByIdAndUpdate(req.params.id, req.body)
      .then(data=>{
        res.status(201).send(data);
      })
      .catch(error=>{
        res.status(400).send(error);
      });
  },
  delete(req, res, next){
    Product.findByIdAndDelete(req.params.id)
      .then(data=>{
        res.status(200).send(data);
      })
      .catch(error=>{
        res.status(400).send(error);
      })
  }
}