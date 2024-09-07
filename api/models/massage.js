const mongoose = require('mongoose');

const massageSchema = new mongoose.Schema({

    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    recipientId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    massageType:{
        type:String,
        enum:["text", "image"],
    },

    massage:String,
    imageUrl:String,

    timeStamp: {
        type:Date,
        Default:Date.now,
    },
});

const Massage = mongoose.model("Massage",massageSchema);

module.exports = Massage;