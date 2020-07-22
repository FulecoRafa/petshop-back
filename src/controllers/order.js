const mongoose = require('mongoose');
const Order = mongoose.model('Order');

module.exports = {
  get(req, res, next){
    console.log(req.body.from);
    console.log(req.body.to);
    console.log(!(req.body.from && req.body.to))
    if(!(req.body.from && req.body.to)) return res.status(400).send("Please provide from and to dates");
    Order.find({createdAt: {$gte: req.body.from, $lte: req.body.to}}, 'createdAt status')
      .populate('customer', 'name -_id')
      .populate('items.product', 'title -_id')
      .then(data=>{
        if(data.length < 1) return res.status(400).send("No orders found between these dates");
        res.status(200).send(data)
      })
      .catch(error=>{
        res.status(400).send(error)
      })
  },
  create(req, res, next){
    Order.create(req.body)
      .then(data=>{
        res.status(201).send("Succesfully ordered");
      })
      .catch(error=>{
        res.status(400).send(error);
      })
  },
  setStatus(req, res, next){
    Order.findByIdAndUpdate(req.params.id, {status: req.params.status})
      .then(data=>{
        res.status(200).send(data.status)
      })
      .catch(error=>{
        res.status(400).send(error);
      });
  },
}