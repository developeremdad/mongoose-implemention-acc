const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const colors = require("colors");

const app = require("./app");
const { connectToServer } = require("./utils/dbConnect");

// server
const port = process.env.PORT || 8080;


// database connection
mongoose.connect(process.env.DATABASE,).then(() => {
  console.log('Database connection is successfully');
})

app.listen(port, () => {
  console.log(`Inventory app is running on port ${port}`.yellow.bold);
});

// connectToServer( (err) =>{
//   if(!err){
//     app.listen(port, () => {
//       console.log(`Inventory app is running on port ${port}`.yellow.bold);
//     });
//   }
//   else{
//     console.log(err);
//   }
// });
