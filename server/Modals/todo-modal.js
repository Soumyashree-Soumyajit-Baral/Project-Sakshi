const mongoose=require("mongoose")

const TodoSchema=mongoose.Schema({
    activity: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: "Pending"
    }

})
const todoModal = mongoose.model("taskAdd",TodoSchema)
module.exports= todoModal;