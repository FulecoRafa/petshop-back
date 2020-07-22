const mongoose = require('mongoose');
const RK = mongoose.model('RefreshKey');

module.exports = {
  get(key){
    RK.find({key:key})
      .then(data=>{
        return true;
      })
      .catch(error=>{
        return false;
      });
  },
  create(key){
    RK.create({key: key})
      .then(data=>{
        return true;
      })
      .catch(error=>{
        return error;
      })
  },
  delete(key){
    RK.deleteOne({key: key})
      .then(data=>{
        return true;
      })
      .catch(error=>{
        return false;
      });
  }
}