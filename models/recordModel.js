const mongoose = require("mongoose")
const Schema = mongoose.Schema

const recordSchema = new Schema({
    mathScore: {
        type: Number
    },
    englishScore: {
        type: Number
    },
   createdBy: {
    type: Schema.Types.ObjectId,
    ref: "users"
   }
},
{timestamps: true}
)

module.exports = mongoose.model("records", recordSchema)
