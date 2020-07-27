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
  getByUser(req, res, next){
    Order.findOne({customer: req.params.id, status: {$ne: 'done'}})
      .populate('customer', 'name')
      .populate('items.product', 'title price')
      .then(data=>{
        if(data.length < 1) return res.status(400).send("No cart found for this user");
        res.status(200).send(data)
      })
      .catch(error=>{
        res.status(400).send("Information for cart finding incorrect");
      })
  },
  create(req, res, next){
    Order.create(req.body)
      .then(data=>{
        res.status(201).send("Succesfully ordered");
      })
      .catch(error=>{
        console.log(error);
        res.status(400).send(error);
      })
  },
  addProduct(req, res, next){
    Order.findOne(
      {customer: req.params.id, status: {$ne: 'done'}}
    )
      .then(async data=>{ 
        if(data == null) {
          console.log("Data is null, creating order");
          await Order.create({customer: req.params.id})
            .then(data2=>{
              data = data2;
            })
            .catch(error=>{
              console.log(error);
              res.status(400).send(error);
            })
        }
        let found = false;
        for(one in data.items){
          if(one.product == req.body.id){
            one.quantity++;
          }
        }
        if(!found){
          data.items.push({
            quantity: 1,
            price: req.body.price,
            product: mongoose.Types.ObjectId(req.body.id)
          });
          data.save();
        }
        res.status(200).send("Update Succesfull");
      })
      .catch(err=>{
        console.log(err);
        res.status(400).send("There was an error adding item");
      });
  },
  save(req, res, next){
    console.info(req.body);
    Order.findByIdAndUpdate(req.params.id, {items: req.body, status:'created'})
      .then(data=>{
        res.status(200).send("Cart saved");
      })
      .catch(err=>{
        console.error(err);
        res.status(400).send("Problem saving cart information");
      });
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