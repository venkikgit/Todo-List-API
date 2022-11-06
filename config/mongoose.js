const dotenv = require('dotenv');
const mongoose = require('mongoose');


dotenv.config({path:'./.env'});
const database = process.env.DATABASE;
// console.log(database);

const db = ()=>{
    mongoose.connect(database,{useNewUrlParser:true,useUnifiedTopology:true}).then((data)=>{
        console.log(`Mongodb connected with server: ${data.connection.host}`)
    });
}

module.exports = db;