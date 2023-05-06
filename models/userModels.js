const mongoose = require("mongoose")

const userSchema = mongoose.Schema(
    {
      email:{
        type:String
      },
      coin:{
        type:Number
      }
    },
    {
      timestamps:true
    }
  )
  
  const User = mongoose.model("User", userSchema);
  
  module.exports = User;
