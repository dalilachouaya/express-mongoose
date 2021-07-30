// connect to our db
const mongoose = require('mongoose');
const dotenv = require('dotenv')
//create a cluster : deployment of our cluster
const MONGO_URI ='mongodb+srv://dalilaCh:dalilaCh9999@cluster0.byyrg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

/*******/
dotenv.config();
const connectdb = ()=>{
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    }).then(console.log('successfully connceted ')).catch((error)=>console.log('cannot conncet '+ error))

    mongoose.set('useNewUrlParser', true);
    mongoose.set('useFindAndModify', false);
    mongoose.set('useCreateIndex', true);
}
// our server is successfully connected to the DB , So we can start creating routes for our backend app

module.exports=connectdb

