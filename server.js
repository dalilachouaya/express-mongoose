//require express && mongoose , cors 
const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
/*--------------------------------- */
const person = require('./models/person');
const connectdb = require('./config/connectdb')
const app = express()
dotenv.config();
//PORT
const PORT = process.env.PORT || 5000
//connect to mongodb DB
connectdb();

/******/
// use express middleware
app.use(express.json())
app.use(cors());
//
////////////////////////////////

const listOfUsers = [
  { name: "Andrew", age: 28, favoriteFoods: ["Sushi"] ,phone:"66689541" },
  { name: "Nada", age: 12, favoriteFoods: ["Apple","Pizza"] },
  { name: "May", age: 15, favoriteFoods: ["Pasta"],phone:"8652635" },
];
// 
//Create and Save a Record of a Model:
const newUser = (done)=> {
    const user = new person({
        name: "Dalila CH",
        age: 42, 
        favoriteFoods: ["couscous", "milk"] ,
        phone:'25254661'});
    user.save((err, data)=> err ? console.error(err): done(null, data));
  };
//Create Many Records with model.create()
const createManyUsers = (listOfUsers, done) => {
    person.create(listOfUsers, (err, people) => {
      if (err) return console.log(err);
      done(null, people);
    });
  };
  
  //Use model.find() to Search Your DB
  const findUserByName = (userName, done) => {
    person.find({ name: userName }, (err, userFound) => {
      if (err) return console.log(err);
      done(null, userFound);
    });
  };
  
  // Use model.findOne() to Return a Single Matching Document from Your Database
  const findOneByFood = (food, done) => {
    person.findOne({ favoriteFoods: food }, (err, data) => 
      err ?  console.log(err) : done(null, data)
    );
  };
  
 
  //Use model.findById() to Search Your Database By _id
  const findUserById = (userId, done) => {
    person.findById(userId, (err, data) =>
      err ? console.log(err) : done(null, data)
    );
  };
  //Perform Classic Updates by Running Find, Edit, then Save
  const findEditSave = (personId, done) => {
    const addFood = "Pizza";
    person.findById(userId, (err, data) => {
      if (err) return console.log(err);
      data.favoriteFoods.push(addFood);
      data.save((err,dataNext) =>
        err
          ? console.error("cannot save update ", err.message)
          : done(null, dataNext)
      );
    });
  };
  
  //Perform New Updates on a Document Using model.findOneAndUpdate()
  const findAndUpdate = (userName, done) => {
    const ageToSet = 15;
  
    person.findOneAndUpdate(
      { name: userName },
      { $set: { age: ageToSet } },
      { new: true },
      (err, data) => (err ? done(err, data) : done(null, data))
    );
  };
  //Delete One Document Using model.findByIdAndRemove
  
  const removeById = (userId, done) => {
    person.findByIdAndRemove(userId, (err, data) =>
      err ? done(err, data) : done(null, data)
    );
  };
  //MongoDB and Mongoose - Delete Many Documents with model.remove()
  const removeManyPeople = (done) => {
    const nameDel = "May";
    person.remove({ name: nameDel }, (err, data) =>
      err ? done(err, data) : done(null, data)
    );
  };
  
  //Chain Search Query Helpers to Narrow Search Results
  const queryChain = (done) => {
    const foodToSearch = "Pizza";
    person.find({ favoriteFoods: foodToSearch })
      .sort({ name: 1 })
      .limit(2)
      .select({ age: 0 })
      .exec((err, dataNext) =>
        err
          ? console.error("error getting data: ", err.message)
          : done(null, dataNext)
      );
  };
  
// PORT 
app.listen(PORT,(err)=>{
    if (err){console.log(err)}
    else { console.log( `Server is running at ${PORT}`)}
})

// our server is successfully connected to the DB , So we can start creating routes for our backend app