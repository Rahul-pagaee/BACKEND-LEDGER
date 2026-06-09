const mongoose = require("mongoose");


function connectDB(){
mongoose.connect(process.env.MONGODB_URL)
.then(()=>{
console.log("mongoodb connected");
}
)
.catch((error)=>{
console.log(error);
process.exit(1)
}
)}



module.exports = connectDB


//nmOrJQMKgDtc9Fi9