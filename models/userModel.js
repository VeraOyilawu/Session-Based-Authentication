const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    userName: {
        type: String
    },
    email: {
        type: String
    }, 
    password: {
        type: String
    },   
    records: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "records"
    }]
},
{timestamps: true}
)

const userModel = mongoose.model("users", userSchema)
module.exports = userModel