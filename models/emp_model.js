const mongoose = require('mongoose')

const empSchema = mongoose.Schema({
    firstName: { type:String, require:true},
    lastName: { type:String, require:true},
    age: { type:Number, require:true}
})

const empModel = mongoose.model('employee',empSchema);





module.exports = empModel;