const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
    title :{
        type:String,
        required:[true,"Please Enter the product title"]
    },
    description:{
        type:String,
        required:[true,"Please Enter the product description"]

    },
    date:{
        type:Date,
        default:Date.now
    },
    createdAt:{
        type:Date,
        default:Date.now
    } 
})

module.exports = mongoose.model('List',listSchema);
